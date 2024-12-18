


export const SumBudGet = (generalAmount:number,amount:any) =>{
    const operation=generalAmount+amount;
    localStorage.setItem("budGet",JSON.stringify(operation));
}