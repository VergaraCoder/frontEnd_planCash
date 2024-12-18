import { openDB } from "idb"



export const InitDb = async () =>{
    const dbPromise=await openDB("home",1,{
        upgrade(db){
            if(!db.objectStoreNames.contains("categories") || !db.objectStoreNames.contains("buys") || !db.objectStoreNames.contains("updatedBuys") || !db.objectStoreNames.contains("updatedCategories")){

                db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore("buys",{keyPath:"id" ,autoIncrement:true});
                db.createObjectStore("updatedBuys",{keyPath:"id" ,autoIncrement:true});
                db.createObjectStore("updatedCategories",{keyPath:"id" ,autoIncrement:true});
            }
        }
    });
    // dbPromise.delete("categories",2);
    return dbPromise;
}