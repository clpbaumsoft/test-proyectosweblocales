import axios from "axios";

//Constants
import { BASE_URL_API } from "@/constants/Globals";
import { getCookie } from "./Helpers";

const createInstance = (customHeaders: object | null = null) => {
  
  // Interceptor to add the token to the headers.
  
  return (accessToken: string = '') => {
    const token = accessToken || getCookie('auth_token')
    
    const axiosInstance = axios.create({
      baseURL: BASE_URL_API, 
      headers: customHeaders ? {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 1,
        ...customHeaders,
      } : {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 1
      }
    })
    
    return axiosInstance
  }
}

export const apiRequestFormData = createInstance({'Content-Type': 'multipart/form-data'});

export const apiRequestRaw = (config: object, url: string) => {
  const rawConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BASE_URL_API}${url}`,
    ...config,
  }
  return axios.request(rawConfig)
}

export default createInstance();