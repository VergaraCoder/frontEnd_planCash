export const ReviewDataBuy= (dataToCreateBuy:any,amountAvailableCategory:number) =>{
    try{    
        const dateToday=new Date();
        const dateDataBuy= new Date(dataToCreateBuy.date);

        if(dateToday.getTime() < dateDataBuy.getTime()){
            throw new Error("NO PUEDES REGISTRAR GASTOS FUTUROS REGISTRA GASTOS PASADOS");
        }

        if(dataToCreateBuy.value > amountAvailableCategory){
            throw new Error("NO TIENES SUFICIENTE DINERO PARA REGISTRAR ESTE GASTO")
        }
    }catch(err:any){
        throw err;
    }
}