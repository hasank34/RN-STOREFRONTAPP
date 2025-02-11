import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Paragraph} from 'react-native-paper';
import {theme} from '../../theme';

interface StockIndicatorProps {
  inStock: boolean;
}

const StockIndicator = ({inStock}: StockIndicatorProps) => (
  <View style={styles.stockContainer}>
    <View
      style={[
        styles.stockDot,
        inStock ? styles.inStockDot : styles.outOfStockDot,
      ]}
    />
    <Paragraph style={inStock ? styles.inStock : styles.outOfStock}>
      {inStock ? 'Stokta Var' : 'Stokta Yok'}
    </Paragraph>
  </View>
);

const styles = StyleSheet.create({
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  inStockDot: {
    backgroundColor: theme.colors.success,
  },
  outOfStockDot: {
    backgroundColor: theme.colors.error,
  },
  inStock: {
    color: theme.colors.success,
    fontSize: 12,
  },
  outOfStock: {
    color: theme.colors.error,
    fontSize: 12,
  },
});

export default StockIndicator;
