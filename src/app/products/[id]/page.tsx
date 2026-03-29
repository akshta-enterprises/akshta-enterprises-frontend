import { getBrands, getContact, getProducts } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { notFound } from "next/navigation";
import ProductView from "./ProductView";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const products = getProducts();
  const brands = getBrands();
  const contact = getContact();
  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  const brandName = brands.find((brand) => brand.id === product.brandId)?.name;
  const whatsAppHref = buildWhatsAppLink(
    contact.whatsapp,
    `Hi! I need pricing and availability for ${product.name}. Please share the details.`,
  );

  return (
    <ProductView
      product={product}
      brandName={brandName}
      whatsAppHref={whatsAppHref}
    />
  );
}
