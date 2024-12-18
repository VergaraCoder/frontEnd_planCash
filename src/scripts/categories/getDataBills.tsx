


export const GetBills = async () => {
   try{
    const response:Response=await fetch(`${import.meta.env.VITE_BASE_URL}/bills/all`,{
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