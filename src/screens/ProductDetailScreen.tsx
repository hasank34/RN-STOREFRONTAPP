import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../store/slices/cartSlice';
import {toggleLike} from '../store/slices/likeSlice';
import Toast from 'react-native-toast-message';
import {RootState} from '../store/store';
import ErrorView from '../components/productDetail/ErrorView';
import ProductImage from '../components/productDetail/ProductImage';
import ProductInfo from '../components/productDetail/ProductInfo';
import AddToCartButton from '../components/productDetail/AddToCartButton';

const ProductDetailScreen = ({route, navigation}) => {
  if (!route?.params?.product) {
    return <ErrorView onBack={() => navigation.goBack()} />;
  }

  const {product} = route.params;
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state: RootState) => state.like.likedProducts,
  );
  const isLiked = likedProducts.includes(product.id);

  const handleLike = () => {
    dispatch(toggleLike(product.id));
    Toast.show({
      type: 'success',
      text1: isLiked ? 'Favorilerden Çıkarıldı' : 'Favorilere Eklendi',
      text2: isLiked
        ? `${product.name} favorilerinizden çıkarıldı`
        : `${product.name} favorilerinize eklendi`,
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
  };

  const handleAddToCart = () => {
    if (product.stockAmount > 0) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price1,
          image: product.images[0]?.originalUrl,
          currency: product.currency,
        }),
      );
      Toast.show({
        type: 'success',
        text1: 'Sepete Eklendi',
        text2: `${product.name} sepetinize eklendi`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Stokta Yok',
        text2: 'Bu ürün şu anda stokta bulunmamaktadır',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ProductImage
          imageUrl={product.images[0]?.originalUrl}
          isLiked={isLiked}
          onLike={handleLike}
          onBack={() => navigation.goBack()}
        />
        <ProductInfo
          name={product.fullName}
          price={product.price1}
          currency={product.currency.abbr}
          stockAmount={product.stockAmount}
          categories={product.categories}
        />
      </ScrollView>
      <AddToCartButton
        onPress={handleAddToCart}
        disabled={product.stockAmount === 0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ProductDetailScreen;
