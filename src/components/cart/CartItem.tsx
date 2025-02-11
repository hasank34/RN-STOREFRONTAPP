import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';
import {getImageUrl} from '../../utils/imageHelper';
import {theme} from '../../theme';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    currency: {
      abbr: string;
    };
  };
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number, name: string) => void;
}

const CartItem = ({item, onQuantityChange, onRemove}: CartItemProps) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <View style={styles.imageContainer}>
        <Card.Cover
          source={{uri: getImageUrl(item.image)}}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Title style={styles.title} numberOfLines={2}>
          {item.name}
        </Title>
        <Paragraph style={styles.price}>
          {item.price * item.quantity} {item.currency.abbr}
        </Paragraph>
        <View style={styles.quantityContainer}>
          <IconButton
            icon="minus"
            size={20}
            mode="contained"
            disabled={item.quantity <= 1}
            onPress={() => onQuantityChange(item.id, item.quantity - 1)}
            style={styles.quantityButton}
          />
          <Paragraph style={styles.quantity}>{item.quantity}</Paragraph>
          <IconButton
            icon="plus"
            size={20}
            mode="contained"
            onPress={() => onQuantityChange(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          />
        </View>
      </View>
      <IconButton
        icon="delete"
        size={24}
        color={theme.colors.error}
        onPress={() => onRemove(item.id, item.name)}
        style={styles.deleteButton}
      />
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    margin: 0,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  deleteButton: {
    margin: 0,
  },
});

export default CartItem;
