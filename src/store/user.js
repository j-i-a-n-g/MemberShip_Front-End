import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: null
  },
  reducers: {
    setUserInfo: (state, val) => {
      state.userInfo = { ...val.data }
    }
  }
})

export const { setUserInfo } = user.actions;
export default user.reducer;