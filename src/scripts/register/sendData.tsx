
export const senData=async (data:any) => {
    try{
        
        const response : Response= await fetch(`${import.meta.env.VITE_BASE_URL}/user`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        if(!response.ok){
           return false;
        }
        await response.json();

        return true;
    }catch(err:any){
        return false;
    }
}