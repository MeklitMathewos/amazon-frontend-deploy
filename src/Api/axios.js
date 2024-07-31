import axios from "axios"

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-f1cfc/us-central1/api",
  
    //  baseURL: "http://localhost:5000",
    
      baseURL: "https://amazone-backend-deploy-sypf.onrender.com",
});
(axiosInstance)


export{axiosInstance}