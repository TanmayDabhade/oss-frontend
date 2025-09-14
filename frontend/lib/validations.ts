import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").optional(),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repository: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string().max(50)).max(10, "Maximum 10 tags allowed").optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PUBLIC"),
  organizationId: z.string().optional(),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
