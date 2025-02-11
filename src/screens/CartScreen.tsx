import React, {useCallback} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {removeFromCart, updateQuantity} from '../store/slices/cartSlice';
import Toast from 'react-native-toast-message';
import EmptyCart from '../components/cart/EmptyCart';
import CartItem from '../components/cart/CartItem';
import CartTotal from '../components/cart/CartTotal';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleQuantityChange = useCallback(
    (id: number, quantity: number) => {
      dispatch(updateQuantity({id, quantity}));
    },
    [dispatch],
  );

  const handleRemoveItem = useCallback(
    (id: number, name: string) => {
      dispatch(removeFromCart(id));
      Toast.show({
        type: 'success',
        text1: 'Ürün Silindi',
        text2: `${name} sepetinizden kaldırıldı`,
      });
    },
    [dispatch],
  );

  const handleCheckout = () => {
    Toast.show({
      type: 'info',
      text1: 'Geliştirme Aşamasında',
      text2: 'Ödeme sistemi yakında eklenecektir',
    });
  };

  if (cartItems.length === 0) {
    return (
      <EmptyCart
        message="Sepetiniz boş"
        subMessage="Ürünleri sepetinize ekleyerek alışverişe başlayabilirsiniz"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({item}) => (
          <CartItem
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <CartTotal total={totalPrice} onCheckout={handleCheckout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
});

export default CartScreen;
