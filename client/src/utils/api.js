import axios from "axios"
import { useContext } from "react"
const params={
    headers:{
        Authorization:"Bearer "+process.env.REACT_APP_STRIPE_APP_KEY
    }
}

export const fetchdatafromapi=async (url)=>{
    try{
        const {data}=await axios.get(process.env.REACT_APP_DEV_URL+url,params)
        return data;
    }
    catch(error){
        console.log(error);
        return error;
    } 
}
export const makepaymentrequest=axios.create({
    baseURL:process.env.REACT_APP_DEV_URL,
    headers:{
        Authorization:"bearer "+process.env.REACT_APP_STRIPE_APP_KEY
    }
    
})

export const getSignedInUser = async () => {
    try {
        const response = await axios.get('http://localhost:8081/getSignedInUser');
        return response.data.email;
    } catch (error) {
        console.error("Error fetching signed-in user:", error);
        return null;
    }
};
