



export const findCategoryAndReturnGoodElements = (idCategory:number) => {
    const categorys:string|any= localStorage.getItem("category");

    const findCategory= JSON.parse(categorys);
    let goodElements =[];
    let elementFind;

    for(let i=0 ; i<findCategory.length; i++){
        const element=findCategory[i];

        if(element.idCategory==idCategory){
            console.log("THE CATEGORY FIND ISSSSSSSSSS");
            console.log(element);
            
            elementFind=element;
            continue;
        }
        goodElements.push(element);
    }

    return [elementFind,goodElements];
}