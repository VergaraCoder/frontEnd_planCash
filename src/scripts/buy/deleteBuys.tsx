import { InitDb } from "../indexDb/getDataBase";



export const deleteBuy =async (dateCreated:any) => {

    const db=await InitDb();
    const buyToDelete=await db.get("buys",dateCreated.id);

    if(buyToDelete.alreadyCreated){
        alert("este es uno de los que no se elimina");
        buyToDelete.delete=true;
        await db.put("buys",buyToDelete);
    }
    else{
        await db.delete("buys",dateCreated.id);
    }

    const categorie= await db.get("categories",dateCreated.categoryId);

    categorie.disponible+=Number(dateCreated.value);

    await db.put("categories",categorie);
}