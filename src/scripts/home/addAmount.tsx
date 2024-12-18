



export const addAmount = (amount:number) => {
    const generalAmount: string | any= localStorage.getItem("budGet");
    let operation=JSON.parse(generalAmount) + amount;
    localStorage.setItem("budGet",JSON.stringify(operation));
}