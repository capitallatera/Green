import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {appAxios} from '../axios';

type Data = {
  _id: string;
  name: string;
  rate: string | number | null;
  quantity: string | number | null;
};
type InitialState = {data: Data[]; load: boolean; single: Data; error: any};

export const getAllData = createAsyncThunk('inventory/get_All', async () => {
  const response = await appAxios('get', '/inventory');
  return response;
});

type add_Data = {
  name: string;
  rate: number | null;
  quantity: number | null;
};
export const addInventory = createAsyncThunk(
  'inventory/add',
  async (payload: add_Data, {dispatch}) => {
    const response = await appAxios('post', '/inventory', payload);
    await dispatch(getAllData());
    return response;
  },
);

type single_Data = {
  id: string;
};
export const singleInventory = createAsyncThunk(
  'inventory/single',
  async (payload: single_Data) => {
    const response = await appAxios('get', `/inventory/${payload.id}`);
    return response;
  },
);
// Data
export const editInventory = createAsyncThunk(
  'inventory/edit',
  async (payload: Data, {dispatch}) => {
    const response = await appAxios('put', '/inventory', payload);
    await dispatch(getAllData());
    return response;
  },
);

type delete_Data = {
  id: number | string;
};
export const deleteInventory = createAsyncThunk(
  'inventory/delete',
  async (payload: delete_Data, {dispatch}) => {
    const response = await appAxios('delete', '/inventory', payload);
    await dispatch(getAllData());
    return response;
  },
);

const initialState: InitialState = {
  data: [],
  load: false,
  error: {},
  single: {
    _id: '',
    name: '',
    rate: null,
    quantity: null,
  },
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addInventory.fulfilled, state => {
        state.load = false;
      })
      .addCase(addInventory.rejected, state => {
        state.load = false;
      })
      .addCase(addInventory.pending, state => {
        state.load = true;
      })
      .addCase(singleInventory.fulfilled, (state, action) => {
        state.single = action.payload;
      });
  },
});

export const inventoryState = (state: RootState) => state.inventory;
export default inventorySlice.reducer;
