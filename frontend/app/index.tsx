/*import { router, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";



export default function MainScreen(){

    const [loaded,setLoaded]= useState(false);

    useEffect(()=>{
        if(loaded){
           router.replace("/auth/login");  
        }
       
        },[loaded])

        useEffect(()=>{
            setLoaded(true);
        },[])


        return(
        <Redirect href="/auth/login"/>
        )
}*/