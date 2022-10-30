import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY_Tenant = 'isPublicTenant';
export const PublicTenant = () => SetMetadata(IS_PUBLIC_KEY_Tenant, true);
