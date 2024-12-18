import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router";
import { returnCategory } from "../../scripts/categories/returnCategorie";
import style from './view.module.css';
import { RegisterBuy } from "../../components/registerBuy";
import { dataForm } from "../../utils/interfaces/dataForm";
import { dataBill, saveBuys } from "../../scripts/categories/saveData";
import { deleteCategory } from "../../scripts/categories/deleteCategori";
import { dataState } from "../../utils/dataStates/data.state";
import { UpdatedCategory } from "../../scripts/categories/updatedLocalCategory";
import { SaveValueDisponible } from "../../scripts/categories/saveValue";
import { InitDb } from "../../scripts/indexDb/getDataBase";
import { GetBills } from "../../scripts/categories/getDataBills";
import { SaveBuysIndexDb } from "../../scripts/categories/saveBuysIndexDb";
import PieChart from "../../components/estadistic";
import { setStatistics } from "../../scripts/categories/setStatistics";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCoffee, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useLayout } from "../../components/layout/layout";
import { updatedDataWithBackEnd } from "../../scripts/layout/logOut";


export const Category = () => {

    const location = useLocation();     //  Hook of location for extracted data and idCategory

    const navigate =  useNavigate();  // Hook of navegation 

    const { showLayout, setShowLayout } = useLayout() as any; 

    const [viewMoreInformation,setViewMoreInformation] = useState("none")
    
    const { 
        idCategory,
    } = location.state as {
        idCategory:number,
    };  // Id category extracted from the state of the location

    const [dataStatisdic,setDataStatistics]=useState<any>({});

    const [errorUpdated,setErrorUpdated] = useState("");

    const [category,setCategory] = useState<any>();  // initial state for data category this include (dateInitial,dateFinal name,etc..)

    const [captureStateCategory,setCaptureStateCategory]= useState<any>();  // State for capture the data of the category in the form of state

    const [available,setAvailale] = useState<any>();

    const [modal,setModal] = useState(false);   // state for modal to register buys
    
        const [localStorageBuy,setLocalStorageBuys] = useState<dataBill[] | any>([dataState]);  // state is a object empty 

    // const [amount,setAmount] = useState<number>();  //  state for amount of the category (NO GENERAL)

    const [form,setForm] = useState<dataForm | any>({   // state for form to create register buys
        purchaseName:"",
        description:"",
        value:0,
        date:""
    }) ;

    const [count,setCount] = useState<number>(0);  // State for 
    
    
    const [classContainer,setClassContainer]=useState<string>("");
    const [error,setError] = useState<string>("");
    
    //const [buys,setBuys]=useState<any>();


    const getBill = async () => {
        const questionBuyBack=localStorage.getItem("backBuys");
        if(!questionBuyBack){
            const allBills= await GetBills();
            console.log("GET BILLS ARE ");
            console.log(allBills);
            
            if(!allBills){
                localStorage.setItem("backBuys",JSON.stringify(true)); // propertie in localStorage to indicate to my logic that the request the back already was done
            }else{
                SaveBuysIndexDb(allBills);
            }
        }
    }


    
    useEffect(() => {
        // Ocultar el layout solo cuando el componente Home se monta
        setShowLayout(false);

        // Mostrar el layout nuevamente cuando el componente se desmonta
        return () => setShowLayout(true);
    }, [setShowLayout]);

    
    useEffect(()=>{
        const putBuys= async () => {
            await getBill();
            const db=await InitDb();
            const buys=await db.getAll("buys");
            const filter=buys.filter((item:any)=> item.categoryId===idCategory && !item.delete);
            console.log("ya recojimosss");
            console.log(filter);
            
            setLocalStorageBuys(filter);
            setCount(filter.length);
        }
        putBuys();       
    },[]);


    useEffect(()=>{
        const data = async () =>{
            console.log("the local data is ");
            console.log(localStorageBuy);
            
            const dataStatisdic=setStatistics(localStorageBuy);
            setDataStatistics(dataStatisdic);    
        }
        data();
    },[localStorageBuy]);

    
    useEffect(()=>{   //UseEffect for get the data of category through request back end 
        const dataCategory = async () =>{                 
            const response = await returnCategory(location.state);   // request for the data category
            
            // setAmount(response.destinado);  // changes the state of amount if it have 2 element that mean that the amount category already exist in local storage
            setAvailale(response.disponible)
            setCategory(response);      // set data complete for show in the screen
            setCaptureStateCategory(response);
        }
        dataCategory();     
    },[idCategory]);


    const showForm = () => {
        setClassContainer("containerModal");
        setModal(true);
    }


    const deletedCategorie = async () => {
        
        const response = await deleteCategory(idCategory);
        if(!response){}
        else{
            navigate("/pages/home");
        }
    }

    const handleLogOut = async () =>{
        await updatedDataWithBackEnd();
        navigate("/pages/register");
    }

    const updatedCategory = async (e:FormEvent<HTMLFormElement>) =>{
        try{
            e.preventDefault();
            const dataCategory=captureStateCategory;
            
            const response=await UpdatedCategory(idCategory,setErrorUpdated,dataCategory,category);
            if(response){
                const operation= Number(dataCategory.amount) - Number(category.amount);
               setAvailale((prev:number)=>prev+operation);
               SaveValueDisponible(dataCategory,available,operation);

                setCategory((preve:any)=>({
                    ...preve,
                    name:dataCategory.name,
                    dateStart:dataCategory.dateStart,
                    dateEnd:dataCategory.dateEnd,
                    amount:dataCategory.amount
                }));
                setCaptureStateCategory((preve:any)=>({
                    ...preve,
                    destinado:Number(dataCategory.destinado)
                }));

                HideFormUpdatedDataCategory();
            }
    
        }catch(err:any){
            setErrorUpdated(err.message);
            setTimeout(()=>{
                setErrorUpdated("");
            },3000);            
        }
    }

    const handleChange=(e:ChangeEvent<HTMLInputElement>) => {                
        setCaptureStateCategory({
            ...captureStateCategory,
            [e.target.name]:e.target.value
        });
    }

    const handleSendData = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const submit= e.nativeEvent.submitter as HTMLButtonElement;

            if(submit.name=="enviar"){
                const dataCount:any=await saveBuys(idCategory,{
                    categoryId:idCategory,
                    purchaseName:form.purchaseName,
                    description:form.description,
                    value:form.value,
                    date:form.date
                },setAvailale,setLocalStorageBuys,setDataStatistics);
                  
                setCount(dataCount);
            }
            setClassContainer("containerModalCancel");
            setForm({
                purchaseName:"",
                description:"",
                value:0,
                date:""
            });
            
            
    }catch(err:any){
        setError(err.message);
        setTimeout(()=>{
            setError("");
        },4000);             
    }
    }



    const viewDetailsBuys = (data:any) => {        
        const dataToSend={
            categoryId:idCategory,
            purchaseName:data.purchaseName,
            description:data.description,
            value:data.value,
            date:data.date,
            dateCreated:data.dateCreated,
            id:data.id
        }
        
        navigate("/pages/buy",{state:{...dataToSend}});
    }

    const dataRenderBuys = (data:any) => {               
        if(data.length== 1 && data[0].purchaseName==""){            
            return <p>No hay compras registradas</p>;
        }
        else{
            let count =0;
            return data.map((item:any)=>{
                count++;
                return(
                    <button className={style.buttonBuy}>
                        <p> <p style={{fontSize:"15px",color:"red"}}>Nombre : </p>
                            <p>{item.purchaseName}</p> <br/>
                        </p>

                        <p> <p style={{fontSize:"15px",color:"red"}}>Descripcion : </p>
                            <p>{item.description}</p> <br/>
                        </p>

                        <p> <p style={{fontSize:"15px",color:"red"}}>Valor: </p>
                            <p>{item.value}</p> <br/>
                        </p>

                        <button
                            className={style.buttonViewMore}
                            onClick={()=>viewDetailsBuys(item)}
                            >
                                Actualizar registro
                        </button>
                    </button>
                );
            });
        }
    }

    const HideFormUpdatedDataCategory = () => {
        if(viewMoreInformation=="none"){
            setViewMoreInformation("block");
        }
        else{
            //setCaptureStateCategory(category);
            setViewMoreInformation("none");
        }
    }

    const dataRender = (data:any) => {
        if(!data){
            return <div>Loading...</div>;
        }
        else{
            return (
                <div style={{width:"100%", height:"100%"}}>
                    
                    <NavLink className={style.return} onClick={()=>{
                            localStorage.removeItem("new");
                        }} to="/pages/home"> 
                            <FontAwesomeIcon icon={faArrowLeft} size="2x" color="white" to={"/pages/home"}/>
                    </NavLink>


                    <NavLink className={style.return2} onClick={handleLogOut} to="/pages/home"> 
                            <FontAwesomeIcon icon={faDoorOpen} size="2x" color="white" to={"/pages/login"}/>
                            Salir  
                        </NavLink>

 
                    <div className={style.containerTitles}>
                        <h2>
                          {data.name.toUpperCase()}</h2>
    <div className={style.containerBudGetValue}>
                         <p>
                             Destinado inicialmente :  ${category.amount} </p> 

                            <p>Disponible Actualmente : ${available}</p>
                        </div>
                  
                        <button className={style.buttonViewAllItems} onClick={HideFormUpdatedDataCategory}>
                            Ver todo sobre esta categoria
                        </button>

                        <div style={{display:viewMoreInformation}}>
                           <form  className={style.formToUpdatedData} onSubmit={updatedCategory}>

                            <span 
                                style={{position:"absolute",top:"-2%",right:"-1%",backgroundColor:"red",padding:"10px",borderRadius:"3px",color:"white"}}
                                onClick={HideFormUpdatedDataCategory}
                            >
                                X
                            </span>


                                <label >Nombre:  <br/>
                                <input
                                        type="text"
                                        name="name"
                                        value={captureStateCategory.name}
                                        className={style.inputForm}
                                        placeholder="Nombre de categoria"
                                        onChange={handleChange}
                                    />
                                </label>

                                <label> Valor destinado : <br/>

                                    <input
                                        type="number"
                                        name="amount"
                                        value={captureStateCategory.amount}
                                        placeholder="Monto destinado"
                                        className={style.inputForm}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label> Fecha inicial : <br/>

                                    <input
                                        type="date"
                                        name="dateStart"
                                        className={style.inputForm}
                                        value={captureStateCategory.dateStart}
                                        onChange={handleChange}
                                        placeholder="Fecha Inicial"
                                    />
                                </label>


                                <label>Fecha final : <br/>
                                    <input
                                        type="date"
                                        name="dateEnd"
                                        className={style.inputForm}
                                        value={captureStateCategory.dateEnd}
                                        placeholder="Fecha Final"
                                        onChange={handleChange}
                                    />
                                </label>
                                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                        {
                                            errorUpdated ? 
                                             <p style={{color:"red",fontSize:"15px",textAlign:"center",padding:"0 10px"}}>{errorUpdated}</p>:
                                             null
                                        }
                                    </div>

                                    <input
                                        type="submit"
                                        className={style.buttonToKeepData}
                                        value={"Actualizar"}
                                    />

                           </form>
                        </div>
                    </div>


                    <div className={style.containerExpenseRecords}>
                        <button 
                            onClick={
                               async ()=>{
                                    await deletedCategorie()
                                }
                            }
                            className={style.delete}
                        >   Eliminar categoria
                        </button>
                        <button
                            className={style.add}
                           onClick={showForm} >Registrar gasto
                        </button>
                    </div>
                </div>
            );
        }
    }

    return(
        <div className={style.containerGeneral}>
            <div className={style.containerGeneral2}>
            {
                captureStateCategory ? 
                (dataRender(captureStateCategory))
                :null
            }
           
           {
            localStorageBuy.length > 0 && localStorageBuy.length == count? 
                <div className={style.containerStadis}>
                <PieChart dataSet={dataStatisdic}/>
                </div>
            :null
           }

            { 
            modal ? 
                (<RegisterBuy 
                    form={form} 
                    setForm={setForm} 
                    styleContainerGeneral={style[classContainer]}
                    styleForm={style.formModal}
                    sendForm={handleSendData}
                    error={error}
                    setError={setError}
                />):
                null
            }
            </div>

            <div className={style.containerRenderBuys}>
                <h1 className={style.titleBuy}>Gastos registrados : </h1>
                {
                   localStorageBuy.length == count  ?
                        dataRenderBuys(localStorageBuy)
                    :
                    <p>No hay gastos creados</p>
                }
            </div>
        </div>
    );
}



