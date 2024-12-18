import { InitDb } from "../indexDb/getDataBase"

export const SaveBuysIndexDb = async (buys:any) =>{
    const db=await InitDb();

    buys.forEach((element:any) => {
        const data={...element,alreadyCreated:true}
        db.add("buys",data);
    });

    localStorage.setItem("backBuys",JSON.stringify(true)); // propertie in localStorage to indicate to my logic that the request the back already was done

}