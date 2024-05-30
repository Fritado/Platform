import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  domainName: null,
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
    setDomainName: (state, action) => {
      state.domainName = action.payload;
    },
  },
});

export const { setDomainName } = domainSlice.actions;
export const selectDomainName = (state) => state.domain.domainName;

export default domainSlice.reducer;