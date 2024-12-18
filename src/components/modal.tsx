import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import DatePicker from "react-datepicker";
import { createCategorie } from "../scripts/home/categories/createCategorie";
import { Navigation, useNavigation } from "react-router";
import { InitDb } from "../scripts/indexDb/getDataBase";


interface PropsModal{
}

export const Modal = ({form,setForm,styleInput, styleContainer, styleButton, styleContainerButton,styleForm, styleInputDate, setError ,error, cancelCreation,restarValues, subtractGeneralAmount
}:any) => {


    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const [date,setDate] = useState<any>(new Date());


    const handleSendData = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const submit= e.nativeEvent.submitter as HTMLButtonElement;
            
            console.log("enter Send Data");

            if(submit.name=="enviar"){
            
                console.log(form);
                
                const response:boolean= await createCategorie({
                    name:form.name,
                    amount:Number(form.amount),
                    disponible:Number(form.amount),
                    dateEnd:form.dateEnd,
                    dateStart:form.dateStart
                });

                restarValues({
                    name:"",
                    dateStart:"",
                    dateEnd:"",
                    amount:0
                });

                const [data,setData]=subtractGeneralAmount;

                setData((preven:any)=>({
                    ...preven,
                    budGet:preven.budGet - form.amount,
                }));
                const operation=data.budget-form.amount;
                localStorage.setItem("budGet",JSON.stringify(operation));
                window.location.reload();
            }
    }catch(err:any){
            setError(err.message);
            setTimeout(()=>{
                setError("");
            },3000);
            
        }
    }

    return(
        <div className={styleContainer}>
            <h1 style={{fontSize:"23px"}}>
                Añadiendo caracteriditicas del nuevo presupuesto
            </h1>
            <form className={styleForm} onSubmit={handleSendData}>
                <Input
                    placeholder="Nombre de categoria"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    visi={false}
                    style={styleInput}
                />

                <Input
                    placeholder="Cantidad para esta categoria"
                    value={form.amount}
                    name="amount"
                    onChange={handleChange}
                    visi={false}
                    style={styleInput}
                />  

                <div style={{display:"flex", height:"20%", width:"100%"}}>
                    <label style={{width:"50%" , height:"90%"}} >
                        Fecha inicio
                    <input
                        type="date"
                        value={form.dateStart}
                        onChange={handleChange}
                        className={styleInputDate}
                        name="dateStart"
                    />


                    </label>

                    <label style={{width:"50%",height:"90%"}}>
                        Fecha final
                    <input
                        type="date"
                        value={form.dateEnd}
                        onChange={handleChange}
                        className={styleInputDate}
                        name="dateEnd"
                    />
                    </label>

                </div>

                <div style={{ width:"100%",height:"8%"}}>
                    {error ? 
                       error
                    :
                       null 
                    }
                </div>

                <div className={styleContainerButton}>
                    <Button style={styleButton} text="Cancelar" onClick={cancelCreation} name="cancelar"/>
                    <Button style={styleButton} text="Crear" name="enviar"/>
                </div>

            </form>
        </div>
    );
}