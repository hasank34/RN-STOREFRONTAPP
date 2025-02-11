export interface Currency {
  id: number;
  name: string;
  abbr: string;
  symbol: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: number;
  originalUrl: string;
  thumbnailUrl: string;
}

export interface Product {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  price1: number;
  currency: Currency;
  stockAmount: number;
  images: ProductImage[];
  categories?: Category[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  currency: Currency;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export interface ProductImageProps {
  imageUrl: string;
  isLiked: boolean;
  onLike: (e: React.SyntheticEvent) => void;
  cardWidth: number;
}

export interface StockIndicatorProps {
  inStock: boolean;
}
