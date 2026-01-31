export function generateMockProducts(amount: number) {
  return Array.from({ length: amount }, (_, i) => ({
    id: `mock-id-${i + 1}`,
    name: `Mock product ${i + 1}`,
    description: `Mock description for product ${i + 1}`,
    price: 1000 + i,
    is_location_offer: false,
    is_rental: false,
    co2_rating: "A",
    in_stock: true,
    is_eco_friendly: false,
    product_image: {
      id: `mock-image-${i + 1}`,
      by_name: "Mock Author",
      by_url: "https://example.com",
      source_name: "MockSource",
      source_url: "https://example.com",
      file_name: "mock-image.avif",
      title: `Mock product ${i + 1}`,
    },
    category: {
      id: `mock-category-${i + 1}`,
      name: "Mock Category",
      slug: "mock-category",
    },
    brand: {
      id: `mock-brand-${i + 1}`,
      name: "Mock Brand",
    },
  }));
}
