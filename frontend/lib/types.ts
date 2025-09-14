import { User, Organization, Project, OrganizationMember, MemberRole, Visibility } from "@prisma/client";

export type { User, Organization, Project, OrganizationMember, MemberRole, Visibility };

export type OrganizationWithOwner = Organization & {
  owner: User;
};

export type OrganizationWithMembers = Organization & {
  owner: User;
  members: (OrganizationMember & {
    user: User;
  })[];
};

export type ProjectWithOwner = Project & {
  owner: User;
};

export type ProjectWithOrganization = Project & {
  owner: User;
  organization: Organization | null;
};

export type UserWithOrganizations = User & {
  organizations: (OrganizationMember & {
    organization: Organization;
  })[];
  ownedOrgs: Organization[];
};
