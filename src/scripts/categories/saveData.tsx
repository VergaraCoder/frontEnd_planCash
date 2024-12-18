import { stringify } from "querystring";
import { dataForm } from "../../utils/interfaces/dataForm";
import { InitDb } from "../indexDb/getDataBase";
import { ReviewDataBuy } from "./reviewDataBuy";
import { setStatistics } from "./setStatistics";



export interface dataBill{
    id:number;
    purchaseName:string;
    description:string;
    value:number;
    date:string;
}


export const saveBuys = async (category:number,data:dataForm,setAvailable:Function, setLocalStorageBuys:any,setDataStatistics:any) => {

   try{
    const db=await InitDb(); // getDtabase
    const dataComplete= {...data,categoryId:category}; // data for save in the localStorage 
    

    const updatedCategorie=await db.get("categories",category);
    
    ReviewDataBuy(data,updatedCategorie.disponible);
    
    await db.add("buys",dataComplete);
    
    updatedCategorie.disponible -= Number(data.value);

    await db.put("categories",updatedCategorie);

    const allBuys=await db.getAll("buys");
    
    const filterBuys= allBuys.filter((buy:any)=>buy.categoryId===category  && !buy.delete);

    const dataStatiscts=setStatistics(filterBuys);
    
    setDataStatistics(dataStatiscts);
    setLocalStorageBuys(filterBuys);   

    setAvailable(updatedCategorie.disponible);

    return filterBuys.length;
   }catch(err:any){
        console.error(err.message);
        throw err;
   }
}



















 // if(transform == null){
    //     let arrayData:any[]=[];
    //     arrayData.push(dataComplete);                
    //     setLocalStorageBuys(arrayData);
    //     localStorage.setItem(category.toString(),JSON.stringify(arrayData));
    // }
    // else{        
    //     transform.push(dataComplete);
    //     setLocalStorageBuys(transform);
    //     localStorage.setItem(category.toString(),JSON.stringify(transform));
    // }


 // const AmountCategory:string|any=localStorage.getItem("category");
    // const arrayParser= JSON.parse(AmountCategory);

    // const extractCategorie= arrayParser.filter((item:any)=>{
    //     return item.idCategory == category;
    // });

    // extractCategorie[0].disponible -= data.value;
    
    // localStorage.setItem("category",JSON.stringify(arrayParser));
