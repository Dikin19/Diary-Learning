// Expect a cold start of 5 to 10 secs on this service

/**
 * TASK: Implement API client for fetching data from the backend API endpoint
*/

import axios from 'axios'; // library

    const API_BASE_URL = "https://project-tempest-hiring.up.railway.app"

    const apiClient = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
    });


    // const  test = async ()=>{

    //     const id = []

    //     try {

    //         const response = await apiClient.get('/cms/diary',{
    //             params: {
    //                 id,
    //                 status:'posted'
    //             }
    //         });
    //         console.log('api running', response.data);
            
    //     } catch (error) 
    //     {
    //         console.log('api is not running', error.message);
            
    //     }
    // }

    // test()




export {apiClient}


