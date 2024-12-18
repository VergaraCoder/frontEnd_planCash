import { AnyARecord } from "dns";
import { findCategoryAndReturnGoodElements } from "./findCategoryStorage";
import { InitDb } from "../indexDb/getDataBase";




export const deleteCategory = async (idCategory:number) => {
    const question = confirm("Estas seguro de eliminar esta categoria");
    if(question){
    const token=localStorage.getItem("acces_token");
        const request:Response= await fetch(`${import.meta.env.VITE_BASE_URL}/categories/${idCategory}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials:"include"
        });
    
        if(!request.ok){
            const dataError=await request.json();
            throw new Error(dataError.message);
        }
        
        const budGetGeneral:string|any=localStorage.getItem("budGet");

        const db=await InitDb();
        const categorie=await db.get("categories",idCategory);
        await db.delete("categories",idCategory);
        
        let operation=Number(JSON.parse(budGetGeneral))+Number(categorie.amount);

        localStorage.setItem("budGet",JSON.stringify(operation));
        return true;
    }else{
        return null;
    }
}