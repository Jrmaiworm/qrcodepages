export interface IPage {
  id?: number;
  url?: string | null;
  title?: string | null;
  text?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  logoContentType?: string | null;
  logo?: string | null;
  qrcode?: string | null;
}

export const defaultValue: Readonly<IPage> = {};
