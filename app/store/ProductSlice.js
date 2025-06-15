import { createSlice } from "@reduxjs/toolkit";
import { getDiaryContentById, getDiaryFeed } from "../../api/cms";


    const  productSlice = createSlice({ // Utilitas dari Redux Toolkit untuk membuat slice state dengan reducers dan action otomatis.
        name: "products",
        initialState: {
            items: [],
            isLoading: false,
            error: null,
            detail: []
        },

        reducers: { // menjalankan reducer ketika useEffect berjalan di react dan dispatch dari nama function yg dibuat di reducer.

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

            fetchDiaryById: (state, action) => {
                state.detail = action.payload;
                state.isLoading = false;
            },
        },
    });

    export const { fetchDiaries, fetchDiariesFailure, fetchDiariesStart, fetchDiaryById} = productSlice.actions
    export const productReducer = productSlice.reducer; // Mengekspor productReducer agar bisa digabung di Redux store.

    export function fetchDiary (){ // async thunk tanpa menggunakan fitur createAsyncThunk dari Redux Toolkit.
        return async (dispatch) => {
            dispatch(fetchDiariesStart()); // nyalakan loading dari reducer

            try {

                const diaries = await getDiaryFeed(); // panggil api
                // console.log(diaries, 'productslice berhaisil')
                dispatch(fetchDiaries(diaries)); // simpan jika berhasil
                
            } catch (error) {

                console.log(error);
                dispatch(fetchDiariesFailure(error.response?.data?.message || "something went wrong!")); // masuk kesini jika terjadi error

            }
        }
    }

    export function getDiaryById(id){
        return async (dispatch) => {
            dispatch(fetchDiariesStart());

            try {
                
                const diariesById = await getDiaryContentById(id);
                // console.log(diariesById, 'product Slice berhasil');
                dispatch(fetchDiaryById(diariesById));

            } catch (error) {
                
                console.log(error);
                dispatch(fetchDiariesFailure(error.response?.data?.message))
            }
        }
    }



    /**
     

⚠️ 1. Network Error / No Internet
error.message === "Network Error"
Terjadi jika tidak ada koneksi internet, atau backend tidak bisa dijangkau.
error.response akan undefined, jadi masuk ke fallback error.message.

⚠️ 2. API Timeout
Misalnya API terlalu lama merespons dan axios sudah timeout.
error.code === 'ECONNABORTED' (kalau disetel timeout).
Biasanya juga muncul sebagai "Network Error".

⚠️ 3. 404 Not Found
error.response.status === 404
Terjadi jika endpoint /cms/diary tidak ditemukan.
error.response.data.message mungkin berisi pesan seperti "Not Found".

⚠️ 4. 500 Internal Server Error
error.response.status === 500
Masalah dari server (misalnya query database gagal, server crash).
error.response.data.message bisa kosong atau "Internal Server Error".

⚠️ 5. 400 Bad Request
error.response.status === 400
Mungkin terjadi jika parameter id tidak sesuai format, atau status: 'posted' tidak valid.
error.response.data.message bisa menjelaskan kesalahan spesifik.

⚠️ 6. 401 Unauthorized
error.response.status === 401
Jika API membutuhkan otentikasi dan token tidak dikirim.
error.response.data.message biasanya "Unauthorized".

⚠️ 7. 403 Forbidden
error.response.status === 403
Token valid, tapi tidak punya akses untuk mengambil resource ini.
Misalnya, kamu tidak punya izin akses ke diary yang diminta.

⚠️ 8. Duplicate Parameter or Invalid Payload
Jika parameter id dalam params tidak sesuai ekspektasi backend.
Misalnya, id: [1, 2, 3, 4] harus dikirim sebagai string bukan array.
     */
    

/*

[DiaryFeed useEffect]
       |
       v
 dispatch(fetchDiary())  <-- Redux Async Thunk
       |
       v
 dispatch(fetchDiariesStart()) --> isLoading = true
       |
       v
 try {
      await getDiaryFeed()  <-- panggil API
            |
            v
     [BACKEND] /cms/diary?id=....&status=posted
            |
     ┌──────┴───────────────┐
     | Jika sukses          | --> return response.data
     | Jika gagal (404 dll) |
     └──────────┬───────────┘
                v
          throw new Error(message)
                |
                v
 } catch (error) {
     dispatch(fetchDiariesFailure(errorMessage))  <-- simpan error ke redux
 }
       |
       v
  [Redux state updated]
       |
       v
   UI cek error: if (error)
       |
       v
 tampilkan: <p className="text-red-600">Error Message</p>


*/