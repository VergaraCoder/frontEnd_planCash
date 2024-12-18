import { createCategories } from "../../../utils/interfaces/createCategorie";
import { InitDb } from "../../indexDb/getDataBase";




export const createCategorie = async (data:createCategories) =>{
    try{    
        const idBudget=localStorage.getItem("budGetReal") as string;
        const parseData=JSON.parse(idBudget);
    const token=localStorage.getItem("acces_token");
        const dataCreateCategori: Response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({...data, idBudget:parseData}),
            credentials:"include"
        });

        if(!dataCreateCategori.ok){
            const badResponse= await dataCreateCategori.json();
            throw new Error(badResponse.message);
        }

        const responseData= await dataCreateCategori.json();

        const db=await InitDb();

        db.add("categories",{...responseData,disponible:responseData.amount});
        return true;

    }catch(err:any){        
        throw err;
    }
}