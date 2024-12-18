
interface Props{
    style:any
}

export const Header = ({style}:Props) =>{
    return(
        <div className={style}>
            <h1>
                Bienvenido a un Formulario
            </h1>
        </div>
    );
}