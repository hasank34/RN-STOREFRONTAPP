import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api/axios';

interface Category {
  id: number;
  name: string;
  sortOrder: number;
  status: number;
  displayShowcaseContent: number;
  showcaseContentDisplayType: number;
  displayShowcaseFooterContent: number;
  showcaseFooterContentDisplayType: number;
  hasChildren: number;
  isCombine: number;
}

interface ProductToCategory {
  id: number;
  product: {
    id: number;
    fullName: string;
    sku: string;
  };
  category: {
    id: number;
    name: string;
  };
  sortOrder: number | null;
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get<Category[]>('/categories');

      // Aktif kategorileri filtrele ve isme göre sırala
      const activeCategories = response.data
        .filter(category => category.status === 1)
        .map(category => ({
          id: category.id,
          name: category.name,
          sortOrder: category.sortOrder,
          status: category.status,
          displayShowcaseContent: category.displayShowcaseContent,
          showcaseContentDisplayType: category.showcaseContentDisplayType,
          displayShowcaseFooterContent: category.displayShowcaseFooterContent,
          showcaseFooterContentDisplayType:
            category.showcaseFooterContentDisplayType,
          hasChildren: category.hasChildren,
          isCombine: category.isCombine,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return activeCategories;
    } catch (error) {
      return rejectWithValue('Kategoriler yüklenirken bir hata oluştu');
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
