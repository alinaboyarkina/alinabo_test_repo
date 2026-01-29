import { Product } from "../types/productCard";

export function buildSortedProductSets(allProducts: Product[]) {
  return {
    byNameAsc: sortByNameAsc(allProducts),
    byNameDesc: sortByNameDesc(allProducts),
    byPriceAsc: sortByPriceAsc(allProducts),
    byPriceDesc: sortByPriceDesc(allProducts),
  };
}

export function sortByNameAsc(products: Product[]) {
  return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortByNameDesc(products: Product[]) {
  return [...products].sort((a, b) => b.name.localeCompare(a.name));
}

export function sortByPriceAsc(products: Product[]) {
  return [...products].sort((a, b) => a.price - b.price);
}

export function sortByPriceDesc(products: Product[]) {
  return [...products].sort((a, b) => b.price - a.price);
}
