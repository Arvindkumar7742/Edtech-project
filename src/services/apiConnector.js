import axios from "axios";

const axioInstance = axios.create({});

export const apiconnector = (method,url,bodyData,headers,params)=>{
    return axioInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
        headers:headers?headers:null,
        params:params?params:null,
    })
}