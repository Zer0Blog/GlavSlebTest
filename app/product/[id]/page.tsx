import ProductPageClient from './ProductPageClient'

const PRODUCT_IDS = [
  '1247', '0891', '0534', '0712', '1102', '1190', '0920', '0601', '1175', '0333', '0450', '0780',
  '1248', '1205',
]

export function generateStaticParams() {
  return PRODUCT_IDS.map(id => ({ id }))
}

export default function ProductPage() {
  return <ProductPageClient />
}
