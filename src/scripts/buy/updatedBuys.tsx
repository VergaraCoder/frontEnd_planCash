import { findCategoryAndReturnGoodElements } from "../categories/findCategoryStorage";
import { InitDb } from "../indexDb/getDataBase";
import { lessValueToCategory } from "./restarValue";




export const updatedBuy = async (dataBuy:any,setError:any,setDataBuy:any) =>{
  try{

    delete dataBuy.dateCreated;
    const db=await InitDb();
    const oldBuys= await db.get("buys",dataBuy.id);

    const oldValue=Number(oldBuys.value) ;
    const newValue=Number(dataBuy.value);

    const operation=newValue > oldValue ? newValue-oldValue : newValue-oldValue; 

    const category= await db.get("categories",dataBuy.categoryId);

    
    if(category.disponible < operation){
      throw new Error("EL NUEVO MONTO NO ES CUBIERTO POR LOS FONDOS DE ESTA CATEGORIA");
    }

    category.disponible-=operation;
    
    await db.put("buys",dataBuy);
    await db.put("categories",category);

    setDataBuy(dataBuy);

    return true;

  }catch(err:any){
    console.log(err.message);
    
    setError(err.message);
    setTimeout(()=>{
        setError("");
    },2000)
    return false;
  }
}