import { apiClient } from './client.js'

/**
 * TASK: use `apiClient` to fetch list of diary content
 *
 * @example
 * `GET /cms/diary?id=359007&id=358317&id=343275&status=posted`
 * 
 * Note that:
 * - `status` param must exist and have value of `'posted'`
 */
    export async function getDiaryFeed() {

      const ids = [
        359007,
        177123,
        343275,
        341343,
        358317,
        343275,
        342861,
        342723,
        342240,
        341343,
        296907,  
        253782,
        177123,
      ]
      
      try {

        const response = await apiClient.get('/cms/diary',{
          params: {
          id: ids,
          status: 'posted'
        }
        });

        return response.data;

        
      } catch (error) {

        const message = error.response? 
        error.response.data?.message || `API Error: ${error.response.status}`: error.message
        throw new Error (message) // Fallback = solusi pengganti ketika kondisi utama tidak terpenuhi.
      }
    }

/*
    
id dikirim sebagai array (id[]=1&id[]=2):
Jika kamu kirim id: [1, 2, 3], Axios ubah ke:
/cms/diary?id=1&id=2&id=3
👉 Jika backend tidak mendukung array seperti ini, hasilnya bisa abaikan filter id, atau bahkan ambil semua dengan status=posted.
*/

    const diaryFeed = async ()=>{
      try {
        
        const diaries = await getDiaryFeed();
        // console.log('Diary Feed:',diaries);

      } catch (error) {

        console.log('Gagal mengambil data', error);
        
      }
    }

    diaryFeed()

/*
fetch tidak memanipulasi data seperti axios + params: { id: array }.
Jika kamu pakai axios dan mengirimkan array id, maka bentuk query-nya jadi:
?id=359007&id=177123&id=343275...
Ini tergantung bagaimana server menangani parameter ganda. Bisa jadi server tidak mendukung id[]=... atau id=...&id=..., dan hasilnya tidak berurutan.

Dengan fetch, kita ubah manual jadi:
id=359007,177123,343275,...
→ Ini sesuai dengan dokumentasi API yang mengharapkan single query param dengan format CSV (comma separated values). Maka hasilnya berurutan dan sesuai ids.*/

// 4.URLSearchParams
// URLSearchParams adalah API bawaan browser/Node.js untuk membentuk query string:
// const ids = [359007, 177123, 343275];
// const params = new URLSearchParams({
//   id: ids.join(','),     // penting: diubah jadi CSV
//   status: 'posted'
// });
// console.log(params.toString());
// Output: id=359007,177123,343275&status=posted
// ➡️ URLSearchParams cocok jika kita ingin memastikan query string valid dan ter-encode dengan benar.






/**
 * TASK: use `apiClient` to fetch diary content by id
 *
 * @example
 * `GET /cms/diary?id=359007&status=posted`
 * 
 * Note that:
 * - `status` param must exist and have value of `'posted'`
 */
  export async function getDiaryContentById(id) {

    try {

      const response = await apiClient.get('/cms/diary',{

        params: {
          id,
          status: 'posted'
        }
      })

      return response.data
      
    } catch (error) {
      
      const message = error.response? 
      error.response.data?.message || `API Error: ${error.response.status}`: error.message
      throw new Error (message)
    }
  }

  // const checkById =async (id)=>{

  //   try {

  //     const diary = await getDiaryContentById(id)

  //     console.log(diary,'hasil dari diary');
      
  //   } catch (error) {
  //     console.log(error, 'error fetching data')
  //   }

  // }

  // console.log(await checkById('342861'));