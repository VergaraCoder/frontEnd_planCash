

export const SubstractBudGet = (generalAmount:number,amount:any) => {
    const operation=generalAmount-Number(amount);
    localStorage.setItem("budGet",JSON.stringify(operation));
}