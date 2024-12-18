import { Navigate, NavigateFunction, NavLink, useNavigate } from "react-router";
import style from './login.module.css';
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginData } from "../../utils/interfaces/interfaceLogin";
import { verifyData } from "../../scripts/login/verifyData";
import { createBudGet } from "../../scripts/login/createBudGet";



export const Login = () => {

    const [error,setError]= useState<string>();

    const [form,setForm] = useState<LoginData>({
        email:"",
        password:""
    });


    const navigate:NavigateFunction = useNavigate();



    const handleSendData = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const response:boolean= await verifyData({
            email:form.email,
            password:form.password
        },setError); 

        console.log("send data");
        

        if(!response){
            setError("Credenciales incorrectas");
            setTimeout(()=>{
                setError("");
            },3000);
        }
        else{
            const creatBudGet= await createBudGet();
            console.log("enter here");
            navigate("/pages/home",{state:{id:creatBudGet}});
        }
    }


    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {
        console.log(form);
        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }


    return (
        <div className={style.main}>
            <div className={style.containerTitle}>
                <h1 className={style.title}>
                    Login
                </h1>
            </div>

            <div className={style.containerText}>
                <form onSubmit={handleSendData} className={style.form} >

                    <Input
                        visi={false}
                        value={form.email}
                        name="email"
                        placeholder='Email'
                        onChange={handleChange}
                        style={style.input}
                    />


                    <Input
                        visi={true}
                        value={form.password}
                        name="password"
                        placeholder='Password'
                        onChange={handleChange}
                        style={style.input}
                    />

                    <div>
                    {
                        error ?
                            <p className={style.error}>
                                {error}
                            </p>
                            :
                            null
                    }
                    </div>

                    <Button style={style.button} text="Entrar"/>

                    <NavLink className={style.register} to="/pages/register">
                        ¿ No tienes cuenta ? <br /> Registrarme
                    </NavLink>
                </form>
        </div>
        </div >
    );
}