import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";




export const InfoCategory = () => {
    const []= useState();
    return(
        <div className={styleContainerGeneral}>
        <form action="" className={styleForm} onSubmit={sendForm}>
            <label>Name:</label>
            <Input
                placeholder="Nombre de gasto"
                value={form.purchaseName}
                name="purchaseName"
                visi={false}
                //style={}
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