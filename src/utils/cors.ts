import { CorsOptions } from 'cors';

const whiteList: string[] = process.env.WHITE_LIST.split(',');

export const corsOptions: CorsOptions = {
  origin: whiteList,
};
