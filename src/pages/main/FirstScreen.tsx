import { Link } from "react-router";
import style from './firstScreen.module.css';

export const PrincipalScreen = () => {
    
    return(
        <div className={style.general}>
            <div className={style.container}>
                <h1>¿Estas conciente a donde va tu dinero?</h1>
                <div className={style.container2}>
                    <img src="https://img.freepik.com/foto-gratis/retrato-nina-sosteniendo-bocadillo-manteniendo-mano-frente-camisa-mirando-olvidadizo_176474-113364.jpg?t=st=1734572617~exp=1734576217~hmac=862577af92f7b2f06da88df168bfed3e3e94eadd99c17a3ae6803c605116ed46&w=740" className={style.imgHeader}/>
                    <span className={style.span}>¿Cuando gaste todo?</span>
                </div>
                <p>
                Plan cash es una aplicacion web que te permitira plasmar y ver para crear esta conciencia sobre gastos hormiga u otros gastos que no estas consciente de que estan afectando tu economia.
                </p>
            </div>

            <div>
                <div className={style.containerImg}> 
                    <img src={`https://img.freepik.com/vector-gratis/ilustracion-concepto-datos-financieros_114360-3167.jpg?t=st=1734569744~exp=1734573344~hmac=028baf174c3bc520ce004642f892dce4fa105b2b5e65a160237c6bf640e0659c&w=740`} 
                    alt="dinero" 
                    className={`${style.img} ${style.img1}`}
                    
                    />

                    <img src={`https://img.freepik.com/vector-gratis/ilustracion-concepto-planificacion-financiera_114360-20545.jpg?t=st=1734571667~exp=1734575267~hmac=5cc9e8296581e705aca8194f4ec5fd8e4137867592f44bdc22054017eba3146a&w=740`} alt="dinero" className={`${style.img} ${style.img2}`}/>

                    <img src={`https://img.freepik.com/vector-gratis/administrar-ilustracion-concepto-dinero_114360-22030.jpg?t=st=1734571638~exp=1734575238~hmac=2e0ff003e8af39ccabeed3b2c2e49a2fc9a7f157d81c94cfcd30586800a85bad&w=740`} alt="dinero" className={`${style.img} ${style.img3}`}/>

                    <img src={`https://img.freepik.com/vector-gratis/ilustracion-concepto-contable_114360-23749.jpg?t=st=1734571444~exp=1734575044~hmac=f27e4c2115b68677b304e7888c34b04cb8079aaa7997ee7e1eb24e6cdcd37aa8&w=740`} alt="dinero" className={`${style.img} ${style.img4}`}/> 

                    <img src={`https://img.freepik.com/foto-gratis/vista-superior-mujer-trabajando-como-economista_23-2150062318.jpg?t=st=1734572397~exp=1734575997~hmac=451f9809de97d396102f634d9d622196477892d23d75d4888ae43ec43ad5bd64&w=740`} alt="dinero" className={`${style.img} ${style.img5}`}/> 
                </div>
            </div>

            <div className={style.container3}>
                <h3>¿ Porque usar PlanCash ?</h3>
                <ul>
                    <li>Crea mas conciencia sobre tus gastos</li>
                    <li>Date cuenta de gastos hormigas</li>
                    <li>Podras parar a tiempo cuando veas tu dinero tan desperdiciado </li>
                </ul>
                <div className={style.container4}>
                    <Link className={style.link} to={"/pages/register"}>Registrarme </Link>
                    <Link className={style.link} to={"/pages/login"}>Login</Link>
                </div>
            </div>

        </div>
    );
}
