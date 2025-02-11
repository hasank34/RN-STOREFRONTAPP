import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import likeReducer from './slices/likeSlice';
import cartReducer from './slices/cartSlice';

const productsPersistConfig = {
  key: 'products',
  storage: AsyncStorage,
};

const categoriesPersistConfig = {
  key: 'categories',
  storage: AsyncStorage,
};

const likePersistConfig = {
  key: 'like',
  storage: AsyncStorage,
};

const persistedProductsReducer = persistReducer(
  productsPersistConfig,
  productsReducer,
);
const persistedCategoriesReducer = persistReducer(
  categoriesPersistConfig,
  categoriesReducer,
);
const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
};

const persistedLikeReducer = persistReducer(likePersistConfig, likeReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
export const store = configureStore({
  reducer: {
    products: persistedProductsReducer,
    categories: persistedCategoriesReducer,
    like: persistedLikeReducer,
    cart: persistedCartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
