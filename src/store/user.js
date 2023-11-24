import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: null
  },
  reducers: {
    incre: state => {
      state.userInfo = {}
    }
  }
})

export const { incre } = user.actions;
export default user.reducer;