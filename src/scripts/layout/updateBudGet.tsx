



export const    updateBudGet = async (amount:number) => {
    const localStorageBudGet:string|any=localStorage.getItem("budGetReal");
    const token=localStorage.getItem("acces_token");
    const idBudget=JSON.parse(localStorageBudGet);
        const response : Response = await fetch(`${import.meta.env.VITE_BASE_URL}/budGet/${idBudget}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({ generalAmount:amount}),
            credentials:"include"
        });
        if(!response.ok){
            throw new Error("sucedio un error");
        }
        // await response.json();
}