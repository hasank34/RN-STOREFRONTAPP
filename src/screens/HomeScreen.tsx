import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../store/slices/productsSlice';
import {fetchCategories} from '../store/slices/categoriesSlice';
import {RootState, AppDispatch} from '../store/store';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import CategoryList from '../components/home/CategoryList';
import ProductList from '../components/home/ProductList';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {items: products, loading: productsLoading} = useSelector(
    (state: RootState) => state.products,
  );
  const {items: categories, loading: categoriesLoading} = useSelector(
    (state: RootState) => state.categories,
  );

  const loadData = async () => {
    try {
      await Promise.all([
        dispatch(fetchProducts()).unwrap(),
        dispatch(fetchCategories()).unwrap(),
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product =>
      product.categories?.some(category => category.id === selectedCategory),
    );
  }, [products, selectedCategory]);

  if (productsLoading || categoriesLoading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductList
        products={filteredProducts}
        onProductPress={product =>
          navigation.navigate('ProductDetail', {product})
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        selectedCategory={selectedCategory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
