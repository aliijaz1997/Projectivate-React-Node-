export interface Tenant {
  id: string;
  name: string;
}

export interface TenantForm {
  name: string;
}

export interface InviteForm {
  email: string;
}

export interface Member {
  id: string;
  email: string;
  image?: string;
  displayName?: string;
}
