export type Brand = {
  id: string;
  name: string;
  logo: string; // public path
};

export type Product = {
  id: string;
  name: string;
  category: string;
  brandId: string;
  shortDescription: string;
  tags?: string[];
  image: string; // public path
  amazonUrl?: string; // optional external link
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

