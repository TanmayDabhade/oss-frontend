"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { createOrganizationSchema, updateOrganizationSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrganization(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    website: formData.get("website") as string,
  };

  const validatedData = createOrganizationSchema.parse(rawData);
  const slug = slugify(validatedData.name);

  // Check if slug already exists
  const existingOrg = await prisma.organization.findUnique({
    where: { slug },
  });

  if (existingOrg) {
    throw new Error("An organization with this name already exists");
  }

  try {
    const organization = await prisma.organization.create({
      data: {
        ...validatedData,
        slug,
        ownerId: session.user.id,
      },
    });

    revalidatePath("/organizations");
    redirect(`/organizations/${organization.slug}`);
  } catch (error) {
    console.error("Failed to create organization:", error);
    throw new Error("Failed to create organization");
  }
}

export async function updateOrganization(slug: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    website: formData.get("website") as string,
  };

  const validatedData = updateOrganizationSchema.parse(rawData);

  // Check ownership
  const organization = await prisma.organization.findUnique({
    where: { slug },
  });

  if (!organization) {
    throw new Error("Organization not found");
  }

  if (organization.ownerId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  try {
    const updateData: any = { ...validatedData };
    
    // If name changed, update slug
    if (validatedData.name && validatedData.name !== organization.name) {
      const newSlug = slugify(validatedData.name);
      
      // Check if new slug already exists
      const existingOrg = await prisma.organization.findUnique({
        where: { slug: newSlug },
      });

      if (existingOrg) {
        throw new Error("An organization with this name already exists");
      }
      
      updateData.slug = newSlug;
    }

    await prisma.organization.update({
      where: { slug },
      data: updateData,
    });

    revalidatePath("/organizations");
    revalidatePath(`/organizations/${slug}`);
    
    // Redirect to new slug if it changed
    if (updateData.slug && updateData.slug !== slug) {
      redirect(`/organizations/${updateData.slug}`);
    }
  } catch (error) {
    console.error("Failed to update organization:", error);
    throw new Error("Failed to update organization");
  }
}

export async function deleteOrganization(slug: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Check ownership
  const organization = await prisma.organization.findUnique({
    where: { slug },
  });

  if (!organization) {
    throw new Error("Organization not found");
  }

  if (organization.ownerId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.organization.delete({
      where: { slug },
    });

    revalidatePath("/organizations");
    redirect("/organizations");
  } catch (error) {
    console.error("Failed to delete organization:", error);
    throw new Error("Failed to delete organization");
  }
}

export async function getUserOrganizations() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  try {
    const organizations = await prisma.organization.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          {
            members: {
              some: {
                userId: session.user.id,
              },
            },
          },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            members: true,
            projects: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return organizations;
  } catch (error) {
    console.error("Failed to fetch user organizations:", error);
    return [];
  }
}

export async function getOrganizationBySlug(slug: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const organization = await prisma.organization.findUnique({
      where: { slug },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            joinedAt: "asc",
          },
        },
        projects: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!organization) {
      throw new Error("Organization not found");
    }

    // Check if user has access to this organization
    const hasAccess = organization.ownerId === session.user.id ||
      organization.members.some(member => member.userId === session.user.id);

    if (!hasAccess) {
      throw new Error("Unauthorized");
    }

    return organization;
  } catch (error) {
    console.error("Failed to fetch organization:", error);
    throw new Error("Failed to fetch organization");
  }
}
