import React, {useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView, FlatList, Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Product} from '../types';
import debounce from 'lodash/debounce';
import SearchBar from '../components/search/SearchBar';
import SearchProductCard from '../components/search/SearchProductCard';
import EmptySearchResult from '../components/search/EmptySearchResult';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector((state: RootState) => state.products.items);
  const fadeAnim = new Animated.Value(1);

  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setIsLoading(true);
      setSearchQuery(text);
      setIsSearching(!!text);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    }, 300),
    [],
  );

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', {product});
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={debouncedSearch} />
      <FlatList
        key="grid"
        data={filteredProducts}
        renderItem={({item}) => (
          <SearchProductCard
            item={item}
            fadeAnim={fadeAnim}
            onPress={() => handleProductPress(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={[
          styles.list,
          !filteredProducts.length && styles.emptyList,
        ]}
        numColumns={2}
        ListEmptyComponent={
          <EmptySearchResult isLoading={isLoading} isSearching={isSearching} />
        }
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 8,
  },
  emptyList: {
    flexGrow: 1,
  },
});

export default SearchScreen;
