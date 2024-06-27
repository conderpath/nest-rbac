import { SetMetadata } from '@nestjs/common';

export const SKIP_KEY = 'skip';
export const PERMISSION_KEY = 'permission';
export const Skip = (auth: boolean = true) => SetMetadata(SKIP_KEY, true);
export const HasPermission = (permission: string) =>
  SetMetadata(PERMISSION_KEY, permission);
