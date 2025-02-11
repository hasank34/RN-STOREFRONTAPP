import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface AddToCartButtonProps {
  onPress: () => void;
  disabled: boolean;
}

const AddToCartButton = ({onPress, disabled}: AddToCartButtonProps) => (
  <View style={styles.bottomContainer}>
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      style={styles.addButton}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}>
      {disabled ? 'Stokta Yok' : 'Sepete Ekle'}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 1,
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCartButton;
