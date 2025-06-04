import { createSlice } from "@reduxjs/toolkit";
import { getDiaryFeed } from "../../api/cms";


    const  productSlice = createSlice({

        name: "products",
        initialState: {
            items: [],
            isLoading: false,
            error: null,
        },

        reducers: {

            fetchDiariesStart: (state) => {
                state.isLoading = true;
                state.error = null;
            },

            fetchDiaries: (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            },

            fetchDiariesFailure: (state, action) =>{
                state.isLoading = false;
                state.error = action.payload;
            },
        },
    });

    export const { fetchDiaries, fetchDiariesFailure, fetchDiariesStart} = productSlice.actions
    export const productReducer = productSlice.reducer;

    export function fetchDiariy (){
        return async (dispatch) => {
            dispatch(fetchDiariesStart())

            try {

                const diaries = await getDiaryFeed()
                // console.log(diaries, 'product slice berhaisil')
                dispatch(fetchDiaries(diaries))
                
            } catch (error) {

                console.log(error);
                dispatch(fetchDiariesFailure(error.response?.data?.message || "something went wrong!"));

            }
        }
    }

    