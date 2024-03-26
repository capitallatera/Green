import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {appAxios} from '../axios';
import {handleParams} from '../../utils/params';

type Data = {
  id: string;
  vegetable: string;
  rate: string | number | null;
  quantity: string | number | null;
};
type InitialState = {data: Data[]; load: boolean; single: Data; error: any};

export const getAllData = createAsyncThunk('inventory/get_All', async () => {
  const response = await appAxios('get', '/inventory');
  return response;
});

type add_Data = {
  id: string;
  vegetable: string;
  rate: number | null;
  quantity: number | null;
};
export const addInventory = createAsyncThunk(
  'inventory/add',
  async (payload: add_Data, {dispatch}) => {
    const response = await appAxios('post', '', payload);
    await dispatch(getAllData());
    return response;
  },
);

type single_Data = {
  id: string;
  isDelete: boolean;
};
export const singleInventory = createAsyncThunk(
  'inventory/single',
  async (payload: single_Data) => {
    const response = await appAxios('get', `${handleParams(payload)}`);
    return response;
  },
);
// Data
export const editInventory = createAsyncThunk(
  'inventory/edit',
  async (payload: Data, {dispatch}) => {
    // update using excel
    const response = await appAxios('post', '', payload);
    await dispatch(getAllData());
    return response;
  },
);

type delete_Data = {
  id: number | string;
  isDelete: boolean;
};
export const deleteInventory = createAsyncThunk(
  'inventory/delete',
  async (params: delete_Data, {dispatch}) => {
    // get method using excel
    const response = await appAxios('get', `${handleParams(params)}`);
    await dispatch(getAllData());
    return response;
  },
);

const initialState: InitialState = {
  data: [],
  load: false,
  error: {},
  single: {
    id: '',
    vegetable: '',
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
