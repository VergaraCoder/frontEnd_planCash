import { dataForm } from "../../utils/interfaces/dataForm";


export const SendBills = async (dataBills:any) => {
    const responseRequest:Response = await fetch(`${import.meta.env.VITE_BASE_URL}/bills`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:dataBills,
        credentials:"include"
    });

    const dataResponse = await responseRequest.json();
    return dataResponse
}
