import type { Brand, ContactInfo, Product, Project } from "@/lib/types";

// Centralized data access layer:
// UI imports from here (not from JSON directly) so swapping to an API later
// only changes this module.

import brandsJson from "../../../data/brands.json";
import productsJson from "../../../data/products.json";
import projectsJson from "../../../data/projects.json";
import contactJson from "../../../data/contact.json";

export function getBrands(): Brand[] {
  return brandsJson as Brand[];
}

export function getProducts(): Product[] {
  return productsJson as Product[];
}

export function getProjects(): Project[] {
  return projectsJson as Project[];
}

export function getContact(): ContactInfo {
  return contactJson as ContactInfo;
}

