


export const returnCategories = async (idBudGet:number) =>{
    try{
        const token=localStorage.getItem("acces_token");
            const data:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/categories/all`,{
                headers:{
                    "Authorization":`Bearer ${token}`,
                }
            });
            const dataCategories= await data.json();
            // console.log("the categoires are ");
            // console.log(dataCategories);
            localStorage.setItem("budGetReal",JSON.stringify(idBudGet));
            return dataCategories;

        
    }catch(err:any){
        throw err;
    }
}