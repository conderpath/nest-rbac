import { SetMetadata } from '@nestjs/common';

export const Skip_KEY = 'skip';
export const Skip = (auth: boolean = true) => SetMetadata(Skip_KEY, true);
