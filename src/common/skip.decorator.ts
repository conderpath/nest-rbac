import { SetMetadata } from '@nestjs/common';

export const SKIP_KEY = 'skip';
export const Skip = (auth: boolean = true) => SetMetadata(SKIP_KEY, true);
