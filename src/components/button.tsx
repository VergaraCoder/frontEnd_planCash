

interface Props{
    onClick?:() => void,
    style:any,
    text:string;
    name?:string;
}

export const Button = ({onClick,style,text,name}:Props) => {
    return(
        <button className={style} onClick={onClick} name={name}>
            {text}
        </button>
    );
}