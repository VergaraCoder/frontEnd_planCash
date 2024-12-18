import { updateBudGet } from "./updateBudGet";
import { SendBills } from "./createBills";
import { InitDb } from "../indexDb/getDataBase";
import { UpdatedBackEndAllCategories } from "../categories/updateAllCategories";
import { updatedAllBuysBack } from "../buy/updatedAllBuys";



export const updatedDataWithBackEnd = async () => {

    const db= await InitDb();

    const allCategories=await db.getAll("categories");
    const allBuys=await db.getAll("buys");
    // const budGetAmount:string|any=localStorage.getItem("budGet");
    //await updateBudGet(JSON.parse(budGetAmount));
    
    await UpdatedBackEndAllCategories(allCategories);
    
    await updatedAllBuysBack(allBuys);
   
    await db.clear("categories");
    await db.clear("buys");
    localStorage.clear();
}