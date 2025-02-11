import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLike} from '../../store/slices/likeSlice';
import {RootState} from '../../store/store';
import {theme} from '../../theme';
import Toast from 'react-native-toast-message';
import ProductImage from './ProductImage';
import StockIndicator from './StockIndicator';

const {width} = Dimensions.get('window');
const cardWidth = (width - 32) / 2;

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price1: number;
    currency: {
      abbr: string;
    };
    stockAmount: number;
    images: Array<{originalUrl: string}>;
  };
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, onPress}) => {
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state: RootState) => state.like.likedProducts,
  );
  const isLiked = likedProducts.includes(product.id);

  const handleLike = (e: any) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
    Toast.show({
      type: 'success',
      text1: isLiked ? 'Favorilerden Çıkarıldı' : 'Favorilere Eklendi',
      text2: `${product.name} ${
        isLiked ? 'favorilerden çıkarıldı' : 'favorilere eklendi'
      }`,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <ProductImage
          imageUrl={product.images[0]?.originalUrl}
          isLiked={isLiked}
          onLike={handleLike}
          cardWidth={cardWidth}
        />
        <Card.Content style={styles.content}>
          <Title numberOfLines={2} style={styles.title}>
            {product.name}
          </Title>
          <Paragraph style={styles.price}>
            {product.price1} {product.currency.abbr}
          </Paragraph>
          <StockIndicator inStock={product.stockAmount > 0} />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    margin: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    height: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
});

export default React.memo(ProductCard);
