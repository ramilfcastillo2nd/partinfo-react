import axios from 'axios';
import environmentConfig from "../environment";
export default(isAuth = true, history = null) => {
    var baseUrl = '';
    if(isAuth){
        baseUrl = environmentConfig().authApiUrl;
    } else {
        baseUrl = environmentConfig().baseApiUrl;
    }
    
    console.log('baseUrl', baseUrl);
    
    let headers = {};
    
    if(localStorage.token){
        headers.Authorization = `Bearer ${localStorage.token}`;
    }
    
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers,
    });
    
    axiosInstance.interceptors.response.use((response) => new Promise((resolve, reject) => {
        resolve(response);
    }), 
    (error) => {
        if(!error.response){
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        console.log('error.response.status');
        console.log(error.response.status);
    
        if(error.response.status === 403){
            localStorage.removeItem("token");
            if(history){
                history.push("/login");
            } else {
                window.location= "/login"
            }
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
    );
    return axiosInstance;
};