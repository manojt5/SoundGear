// import { useState,useEffect } from "react";
// import {fetchdatafromapi} from "../utils/api"
// const useFetch=(endpoint)=>{
//     const [data,setData]=useState();

//     useEffect(async () => {
//         makeapicall();
//     }, [endpoint]);

//     const makeapicall=async()=>{
//         const res=await fetchdatafromapi(endpoint )
//         setData(res)
//     }
//     return data;
    
// }
// export default useFetch;
import { useState, useEffect } from "react";
import { fetchdatafromapi } from "../utils/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState();

  useEffect(() => {
    async function makeApiCall() {
      const res = await fetchdatafromapi(endpoint);
      setData(res);
    }
    makeApiCall();
  }, [endpoint]);

  return {data};
};

export default useFetch;
