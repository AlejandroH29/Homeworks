import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0, step: 1 }, // valor inicial y salto
  reducers: {
    increment: (state) => {
      state.value += state.step; // ahora usa el paso actual
    },
    decrement: (state) => {
      state.value -= 1; // siempre de 1 en 1
    },
    setIncrementStep: (state, action) => {
      state.step = action.payload; // cambia el paso base
    },
  },
});

export const { increment, decrement, setIncrementStep } = counterSlice.actions;
export default counterSlice.reducer;
