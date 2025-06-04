import { createSlice } from "@reduxjs/toolkit";
import { getDiaryContentById, getDiaryFeed } from "../../api/cms";


    const  productSlice = createSlice({

        name: "products",
        initialState: {
            items: [],
            isLoading: false,
            error: null,
            detail: []
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

            fecthDiaryById: (state, action) => {
                state.detail = action.payload;
                state.isLoading = false;
            },
        },
    });

    export const { fetchDiaries, fetchDiariesFailure, fetchDiariesStart, fecthDiaryById} = productSlice.actions
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

    export function getDiaryById(id){
        return async (dispatch) => {
            dispatch(fetchDiariesStart());

            try {
                
                const diariesById = await getDiaryContentById(id)
                console.log(diariesById, 'productSlice');
                dispatch(fecthDiaryById(diariesById))

            } catch (error) {
                
                console.log(error);
                dispatch(fetchDiariesFailure(error.response?.data?.message))
            }
        }
    }

    

    