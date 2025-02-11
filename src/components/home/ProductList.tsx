import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import ProductCard from '../ProductCard';

interface Product {
  id: number;
  name: string;
  price1: number;
  currency: {
    abbr: string;
  };
  stockAmount: number;
  images: Array<{originalUrl: string}>;
}

interface ProductListProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  selectedCategory?: number | null;
}

const ProductList = ({
  products,
  onProductPress,
  refreshing,
  onRefresh,
  selectedCategory,
}: ProductListProps) => (
  <FlatList
    data={products}
    renderItem={({item}) => (
      <ProductCard product={item} onPress={() => onProductPress(item)} />
    )}
    keyExtractor={item => item.id.toString()}
    numColumns={2}
    contentContainerStyle={styles.productList}
    columnWrapperStyle={styles.productRow}
    showsVerticalScrollIndicator={false}
    refreshing={refreshing}
    onRefresh={onRefresh}
    ListEmptyComponent={() => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {selectedCategory
            ? 'Bu kategoride ürün bulunamadı'
            : 'Henüz ürün eklenmemiş'}
        </Text>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  productList: {
    padding: 8,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default ProductList;
