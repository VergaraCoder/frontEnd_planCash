

export const updatedAllBuysBack = async (dataBuys:any) =>{
    try{    
    const token=localStorage.getItem("acces_token");
        console.log("the buy all is");
        console.log(dataBuys);
        
        const response:Response=await fetch(`${import.meta.env.VITE_BASE_URL}/bills/final`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(dataBuys),
            credentials:"include"
        });

        const responseData=await response.json();

        if(!response.ok){
            throw new Error("FALLO LA ACTUALIZACION DE LOS GASTOS");
        }

        console.log("prefect creation and updated bills");
        
        console.log(responseData);
        
        return true;
        
    }catch(err:any){
        throw err;
    }
}