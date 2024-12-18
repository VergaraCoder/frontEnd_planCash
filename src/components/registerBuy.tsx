import { ChangeEvent } from "react";
import { PropsRegisterBuy } from "../utils/interfaces/registerBuy";
import { Input } from "./input";
import { Button } from "./button";
import { error } from "console";


export const RegisterBuy = ({setForm,form,sendForm,styleContainerGeneral,styleForm,styleInput,styleInputDate,styleButtonCancel,styleButtonSend,setError,error}:PropsRegisterBuy) => {

    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }


    const showError = (message:string) => {
        setError(message);
        setTimeout(()=>{
            setError("");
        },3000);
    }

    
    return(
        <div className={styleContainerGeneral}>
            <form action="" className={styleForm} onSubmit={sendForm}>
                <label>Name:</label>
                <Input
                    placeholder="Nombre de gasto"
                    value={form.purchaseName}
                    name="purchaseName"
                    visi={false}
                    style={styleInput}
                    onChange={handleChange}
                />

                <label>Descripcion:</label>
                <Input
                    placeholder="Descripcion del gasto"
                    value={form.description}
                    name="description"
                    style={styleInput}
                    visi={false}
                    onChange={handleChange}
                />

                <label>Valor : </label>
                <input
                    type="number"
                    className={styleInputDate}
                    value={form.value}    
                    onChange={handleChange}
                    name="value"
                />

                <label>Fecha del gasto : </label>
                <input
                    type="date"
                    className={styleInputDate}
                    value={form.date}    
                    onChange={handleChange}
                    name="date"
                />

                <div>
                    {
                     error?
                        <p style={{fontSize:"12px",color:"red",margin:"5px",textAlign:"center"}}>{error}</p>
                     :null   
                    }
                </div>

                <Button
                    text="Registrar"
                    name="enviar"
                    style={styleButtonSend}
                />

                <Button
                    text="Cancelar"
                    name="cancel"
                    style={styleButtonCancel}
                />
            </form>
        </div>
    );
}