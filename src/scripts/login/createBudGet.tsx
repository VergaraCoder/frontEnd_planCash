


export const createBudGet = async () => {
    const token=localStorage.getItem("acces_token");
    const response :Response= await fetch(`${import.meta.env.VITE_BASE_URL}/budGet/one`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        const aata=await response.json();
        console.log(aata);
        
        throw new Error("TODAVIA NO SE PUEDE INGRESAR AL PERFIL INTENTALO MAS TARDE");
    }
    const resultResponse= await response.json();
    console.log(resultResponse);
    
    localStorage.setItem("budGet",JSON.stringify(resultResponse.generalAmount));
    return resultResponse.id;
}