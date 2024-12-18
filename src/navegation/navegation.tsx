import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes,Route } from 'react-router'
import App from '../App'

export const Navegation = () =>{

    return(
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    <Route path='/home' element={<h1>velo</h1>}/>
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}