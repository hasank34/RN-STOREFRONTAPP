import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title, Chip, Divider} from 'react-native-paper';
import {theme} from '../../theme';

interface Category {
  id: number;
  name: string;
}

interface ProductInfoProps {
  name: string;
  price: number;
  currency: string;
  stockAmount: number;
  categories?: Category[];
}

const ProductInfo = ({
  name,
  price,
  currency,
  stockAmount,
  categories,
}: ProductInfoProps) => (
  <View style={styles.contentContainer}>
    <Title style={styles.title}>{name}</Title>
    <View style={styles.priceContainer}>
      <Text style={styles.price}>
        {price} {currency}
      </Text>
      <Chip
        mode="outlined"
        style={[
          styles.stockChip,
          {
            borderColor:
              stockAmount > 0 ? theme.colors.success : theme.colors.error,
          },
        ]}
        textStyle={{
          color: stockAmount > 0 ? theme.colors.success : theme.colors.error,
        }}>
        {stockAmount > 0 ? 'Stokta Var' : 'Stokta Yok'}
      </Chip>
    </View>
    <Divider style={styles.divider} />
    {categories?.length > 0 && (
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <View style={styles.categoriesContainer}>
          {categories.map(category => (
            <Chip
              key={category.id}
              style={styles.categoryChip}
              textStyle={styles.categoryText}>
              {category.name}
            </Chip>
          ))}
        </View>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  stockChip: {
    backgroundColor: 'transparent',
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryChip: {
    margin: 4,
    backgroundColor: '#f0f0f0',
  },
  categoryText: {
    color: '#666',
  },
});

export default ProductInfo;
