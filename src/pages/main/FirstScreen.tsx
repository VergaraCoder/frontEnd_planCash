import { Link } from "react-router";
import style from './firstScreen.module.css';

export const PrincipalScreen = () => {
    
    return(
        <div>
            <div>
                <h1>Bienvenidos a PlanCash</h1>
            </div>

            <div>
                 <h2>PlanCash es una plataforma de gestión de presupuestos y gastos personal</h2>

                 <div>
                    <p>Estas son algunas seccion de nuestro sistema</p>
                 </div>
            </div>

            <Link to={"/pages/register"}>Ir a Register  </Link>
        </div>
    );
}