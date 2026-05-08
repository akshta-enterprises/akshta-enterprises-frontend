export type Brand = {
  id: string;
  name: string;
  logo: string; // public path
  pdfs?: Record<string, string>; // key: PDF name, value: public path
};

// export type Product = {
//   id: string;
//   name: string;
//   category: string;
//   brandId: string;
//   shortDescription: string;
//   tags?: string[];
//   image: string; // public path
//   images?: string[]; // additional images
//   specs?: Record<string, string>; // key-value pairs for specifications
//   url?: string; // optional external link
//   amazonUrl?: string; // optional external link
// };
export type ProductImage = {
  next_path: string;
  url: string;
  is_primary?: boolean;
  downloaded?: boolean;
};

export type Product = {
  id: string;
  name: string;
  model?: string;
  category: string;
  category_id?: string;
  category_path?: string[];

  brandId: string;

  shortDescription: string;
  tags?: string[];

  image: string; // fallback primary image (local/public)

  images?: ProductImage[]; // ✅ updated

  specs?: Record<string, string>; // dynamic specs

  url?: string;
  amazonUrl?: string;
};

export type Project = {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string; // public path
  tags?: string[];
};

export type ContactHours = {
  label: string;
  value: string;
};

export type ContactInfo = {
  companyName: string;
  tagline: string;
  primaryEmail: string;
  phone: string;
  whatsapp: string;
  addressLines: string[];
  hours: ContactHours[];
  mapEmbedUrl: string;
};
