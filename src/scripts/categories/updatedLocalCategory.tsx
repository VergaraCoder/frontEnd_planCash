import { InitDb } from "../indexDb/getDataBase";
import { UpdatedBackEndCategories } from "./updatedBackOneCategorie";

export const UpdatedCategory = async (idCategory:number,setError:any,categoryData:any,oldDataCategory:any) =>{
    try{

        const budGetWithoutParser:string|any= localStorage.getItem("budGet");
        let budGetParser=JSON.parse(budGetWithoutParser);

        const db=await InitDb();
        
        let category=await db.get("categories",idCategory);
        const operationBeetWeenAmounts= categoryData.amount - oldDataCategory.amount;

        if(operationBeetWeenAmounts > budGetParser){
            throw new Error("EL MONTO GENERAAL NO PUEDE SUPLIR ESTE MONTO PARA ESTA CATEGORIA");
        }

        await reviewDataForm(oldDataCategory,categoryData,setError);



        budGetParser-=operationBeetWeenAmounts;
        const disponible=category.disponible+=operationBeetWeenAmounts;

        
        category={...categoryData,disponible:disponible};
        
        category.amount=Number(categoryData.amount);
        await db.put("categories",category);
        localStorage.setItem("budGet",JSON.stringify(budGetParser));
        // console.log("success updated");
        
        return true;
    }catch(err:any){        
        throw err;
    }
} 




const reviewDataForm =async (oldData:any,newData:any,setError:any) =>{
    try{
        
        const datesStartOld=new Date(oldData.dateStart);
        const datesStartNew= new Date(newData.dateStart);
        
        const dateEndOld=new Date(oldData.dateEnd);
        const dateEndNew=new Date(newData.dateEnd);
        

        const startDate= datesStartOld.getTime() - datesStartNew.getTime();
        const endDate= dateEndOld.getTime() - dateEndNew.getTime();
       
        if(startDate !== 0 || endDate!==0){
            await UpdatedBackEndCategories(newData,setError);
            return true;
        }else{
            return true;
        }

    }catch(err:any){       
        throw err;
    }
}


