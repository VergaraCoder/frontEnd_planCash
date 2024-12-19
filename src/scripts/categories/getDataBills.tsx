


export const GetBills = async () => {
   try{
    const token=localStorage.getItem("acces_token");
    const response:Response=await fetch(`${import.meta.env.VITE_BASE_URL}/bills/all`,{
        headers:{
            "Authorization":`Bearer ${token}`
        },
        credentials:"include"
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data;
   }catch(err:any){
    return false;
   }
}