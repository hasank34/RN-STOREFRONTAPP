import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LikeState {
  likedProducts: number[];
}

const initialState: LikeState = {
  likedProducts: [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const index = state.likedProducts.indexOf(action.payload);
      if (index === -1) {
        state.likedProducts.push(action.payload);
      } else {
        state.likedProducts.splice(index, 1);
      }
    },
  },
});

export const {toggleLike} = likeSlice.actions;
export default likeSlice.reducer;
