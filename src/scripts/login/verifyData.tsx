import { LoginData } from "../../utils/interfaces/interfaceLogin";



export const verifyData = async (dataLogin:LoginData,setError:Function) =>{
    try{
        console.log(dataLogin);
        
        const authResponse:Response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dataLogin),
            credentials:"include"
        });

        if(!authResponse.ok){
            return false;
        }

        const tokens= await authResponse.json();

        localStorage.setItem("acces_token",JSON.stringify(tokens.acces_token));

        console.log(tokens);
        
        return true;
        
    }catch(err:any){
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },3000);
        return false;
    }
}