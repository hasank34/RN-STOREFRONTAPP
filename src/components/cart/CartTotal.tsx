import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Button, Text} from 'react-native-paper';
import {theme} from '../../theme';

interface CartTotalProps {
  total: number;
  onCheckout: () => void;
}

const CartTotal = ({total, onCheckout}: CartTotalProps) => (
  <Card style={styles.totalContainer}>
    <Card.Content>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Toplam Tutar:</Text>
        <Text style={styles.totalPrice}>{total.toFixed(2)} TL</Text>
      </View>
      <Button
        mode="contained"
        style={styles.checkoutButton}
        onPress={onCheckout}>
        Siparişi Tamamla
      </Button>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    backgroundColor: 'white',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  checkoutButton: {
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
});

export default CartTotal;
