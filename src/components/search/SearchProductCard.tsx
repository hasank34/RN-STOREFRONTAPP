import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {getImageUrl} from '../../utils/imageHelper';
import {Product} from '../../types';

interface SearchProductCardProps {
  item: Product;
  fadeAnim: Animated.Value;
  onPress: () => void;
}

const SearchProductCard = ({
  item,
  fadeAnim,
  onPress,
}: SearchProductCardProps) => (
  <Animated.View style={[styles.productContainer, {opacity: fadeAnim}]}>
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover
        source={{
          uri: getImageUrl(item.images[0]?.originalUrl),
          headers: {Accept: '*/*'},
        }}
        style={styles.image}
      />
      <Card.Content>
        <Title numberOfLines={1}>{item.name}</Title>
        <Paragraph style={styles.price}>
          {item.price1} {item.currency.abbr}
        </Paragraph>
        {item.stockAmount > 0 ? (
          <Paragraph style={styles.inStock}>Stokta Var</Paragraph>
        ) : (
          <Paragraph style={styles.outOfStock}>Stokta Yok</Paragraph>
        )}
      </Card.Content>
    </Card>
  </Animated.View>
);

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    padding: 4,
  },
  card: {
    margin: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    height: 150,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  inStock: {
    color: 'green',
    fontSize: 12,
  },
  outOfStock: {
    color: 'red',
    fontSize: 12,
  },
});

export default React.memo(SearchProductCard);
