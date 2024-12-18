import { Outlet, useNavigate } from 'react-router';
import style from './layout.module.css';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Button } from '../button';
import { updatedDataWithBackEnd } from '../../scripts/layout/logOut';

interface Props{
    children?:ReactNode;    
}

const context:any=createContext("");

export const Layout = ({children}:Props) =>{

    const navigate= useNavigate();

    const [showLayout, setShowLayout] = useState(true);

    const handleLogOut = async () =>{
        await updatedDataWithBackEnd();
        navigate("/pages/register");
    }

    return (
        <context.Provider value={{ showLayout, setShowLayout }}>
            {showLayout && (
                <div className={style.father}>
                    <header className={style.header}>
                        <h1>PlanCash</h1>
                        <button onClick={handleLogOut}>Log out</button>
                    </header>
                    <Outlet />
                    {children}
                    <footer className={style.footer}>
                        <h2>Colaboradores Contacto</h2>
                    </footer>
                </div>
            )}
            {!showLayout && <Outlet />}
        </context.Provider>
    );
    
}

export const useLayout = () => useContext(context);