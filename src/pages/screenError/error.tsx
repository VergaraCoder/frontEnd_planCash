import { useEffect } from "react";
import { useNavigate } from "react-router";



export const ErrorScreen = () => {
    const navegation=useNavigate();

    useEffect(()=>{
        navegation("/pages/register");
    });

    return(
        <div>
            <h1>Error 404</h1>
        </div>
    );
}