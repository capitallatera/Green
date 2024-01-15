import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { appAxios } from "../axios";

export const getAllData = createAsyncThunk('vegetable/get_All',async () => {
  const response = await appAxios('get', '/vegetable')
  return response
})

type add_payload = {
    name: string
}

export const addVegetable = createAsyncThunk('vegetable/post', async(data:add_payload, { dispatch }) => {
    const response = await appAxios('post', '/vegetable', data)
    await dispatch(getAllData())
    return response
})

type delete_payload = {
    id: string
}

export const deleteVegetable = createAsyncThunk('vegetable/delete',async (data:delete_payload, {dispatch}) => {
    const response = await appAxios('delete', '/vegetable', data)
    await dispatch(getAllData())
    return response
})

const initialState:InitialState = {
    data:[],
    load: false
}

type Data = { _id:string, name:string }
type InitialState = { data : Data[], load:boolean }

const vegetableSlice = createSlice({
    name:'vegetable',
    initialState,
    reducers:{},
    extraReducers : builder => {
        builder.addCase(getAllData.fulfilled,(state, action) => {
            state.data = action.payload;
            state.load = false;
        })
        .addCase(getAllData.pending, (state) => {
            state.load = true
        })
        .addCase(getAllData.rejected, (state) => {
            state.load = false
        })
        // add
        .addCase(addVegetable.pending, (state) => {
            state.load = true
        })
        .addCase(addVegetable.rejected, (state) => {
            state.load = false
        })
        .addCase(addVegetable.fulfilled, (state) => {
            state.load = false
        })
        // delete
        .addCase(deleteVegetable.pending, (state) => {
            state.load = true
        })
        .addCase(deleteVegetable.rejected, (state) => {
            state.load = false
        })
        .addCase(deleteVegetable.fulfilled, (state) => {
            state.load = false
        })
    }

})

export const vegetableState = (state: RootState) => state.vegetable
export default vegetableSlice.reducer