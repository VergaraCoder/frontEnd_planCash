import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../components/input';
import style from './form.module.css';
import { Button } from '../components/button';
import { Link, NavigateFunction, NavLink, useNavigate } from 'react-router-dom';
import { senData } from '../scripts/register/sendData';

interface Data{
    email:string,
    name:string,
    password:string
}

export const FormUse = () => {

    const [form,setForm]= useState<Data>({
        email:"",
        name:"",
        password:""
    });

    const [error,setError] = useState("");


    const navigate:NavigateFunction = useNavigate();


    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {
        console.log(form);
        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handleSendData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        console.log("ENTER FOR SEND dATA");
        
        
        const response : boolean =await senData({
            name:form.name,
            email:form.email,
            password:form.password
        });

        if(!response){
            setError("EL EMAIL YA EXISTE");
            setTimeout(()=>{
                setError("");
            },2000);
        }
        else{
            console.log("VAMOS PARA LA PAGINA DE LOGIN");
            
            navigate("/pages/login");
        }
      };



      

    return(
        <>
            <div className={style.container}>
                <div className={style.container2}>
                <form onSubmit={handleSendData} className={style.form} >

                        <Input
                            visi={false}
                            value={form.name}
                            name="name"
                            placeholder='Name'
                            onChange={handleChange}
                            style={style.input}
                        />

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

                    {
                        error ?
                            <p>
                                {error} MALLLLL
                            </p>
                        :
                        null
                    }

                    <input  
                        type='submit'
                        className={style.button}
                        value={"Resgistrarme"}
                    />

                        <Link className={style.register} to="/pages/login">
                            ¿ Ya tienes cuenta ? <br/> Iniciar sesión
                        </Link>
                </form> 
                </div>
            </div>
        </>
    );
}