import { useEffect } from "react";
import { useNavigate } from "react-router"


export const Redirect = () => {
    const navegation=useNavigate();

    useEffect(()=>{
        navegation('/pages/main')
    });
    return(
        <h1>
            VETE DE AQUI
        </h1>
    );
}