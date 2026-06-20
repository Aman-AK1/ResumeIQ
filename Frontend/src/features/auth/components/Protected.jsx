import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";


const Protected = ({children})=>{
     const {loading, user} = useAuth()
     
     
     if(loading){
        return (<main><h1>Loading....</h1></main>)
     }

     if(!user){
        console.log("BUser:", user);
        return <Navigate to={'/login'} />
        console.log("AUser:", user);
     }
     return children
}

export default Protected
