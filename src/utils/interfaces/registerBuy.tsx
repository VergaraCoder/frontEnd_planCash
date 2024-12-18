
interface dataForm{
    purchaseName:string;
    description:string;
    value:number;
    date:string;
}

export interface PropsRegisterBuy{
    setForm:any
    form:dataForm,
    styleContainerGeneral?:any;
    styleForm?:any;
    styleInput?:any;
    styleInputDate?:any
    styleButtonSend?:any
    styleButtonCancel?:any
    sendForm?:any
    error:string;
    setError:any;
}
