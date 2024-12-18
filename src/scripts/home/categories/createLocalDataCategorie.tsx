



export const sendDataLocalStorage = (data:any, setError:any) => {
    const dataCategories= localStorage.getItem("category");
    if(!dataCategories){
        const arrayCategories= [];
        arrayCategories.push(data);
        localStorage.setItem("category",JSON.stringify(arrayCategories));
    }
    else{
        const arrayCategories2= JSON.parse(dataCategories);
        arrayCategories2.push(data);
        localStorage.setItem("category",JSON.stringify(arrayCategories2));
    }
}