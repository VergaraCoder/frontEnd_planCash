


export const returnBudget = async () =>{
    try{
    const token=localStorage.getItem("acces_token");

        const dataBudget:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/budget/one`,{
            headers:{
                "Authorization":`Bearer ${token}`
            },
            credentials:"include"
        }
        );
        const responseBudget= await dataBudget.json();
        console.log(responseBudget);
        

        // if(responseBudget.message){

        // }
        console.log("PASSSSSSS");

        console.log("THE RESPONSE IS ");
        console.log(responseBudget);
        
        
        localStorage.setItem("budGetReal",JSON.stringify({
            idBudget:responseBudget.id,
        }));

        localStorage.setItem("budGet",JSON.stringify(responseBudget.generalAmount));

        
        
        return responseBudget[0].generalAmount;
    }catch(err:any){

    }
}