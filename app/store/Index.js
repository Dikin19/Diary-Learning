import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from '../store/ProductSlice'

    const store = configureStore({

        reducer: {
            product: productReducer
        },

    })

    export default store;

    // console.log('>>>>>> storee', store);