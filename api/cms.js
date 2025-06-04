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
          },
        });

        return response.data;

        
      } catch (error) {

        const message = error.response? 
        error.response.data?.message || `API Error: ${error.response.status}`: error.message
        throw new Error (message)
      }
    }

    // const diaryFeed = async ()=>{
    //   try {
        
    //     const diaries = await getDiaryFeed();
    //     console.log('Diary Feed:',diaries);

    //   } catch (error) {

    //     console.log('Gagal mengambil data', error);
        
    //   }
    // }

    // diaryFeed()

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
