import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface EmptyCartProps {
  message: string;
  subMessage: string;
}

const EmptyCart = ({message, subMessage}: EmptyCartProps) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{message}</Text>
    <Text style={styles.emptySubText}>{subMessage}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default EmptyCart;
