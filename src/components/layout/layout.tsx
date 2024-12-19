import { Outlet, useNavigate } from 'react-router';
import style from './layout.module.css';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Button } from '../button';
import { updatedDataWithBackEnd } from '../../scripts/layout/logOut';

interface Props{
    children?:ReactNode;    
}

const context:any=createContext("");

export const Layout = ({children}:Props) =>{

    const navigate= useNavigate();

    const [showLayout, setShowLayout] = useState(true);

    useEffect(()=>{
        navigate("/pages/main");
    },[]);

    return (
        <context.Provider value={{ showLayout, setShowLayout }}>
            {showLayout && (
                <div className={style.father}>
                    <header className={style.header}>
                        <h1>Mejora tu control financiero</h1>
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