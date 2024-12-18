



export const lessValueToCategory = (allCategorys:any,categoryGood:any, valueBuy:any,) => {
    // console.log("THE VALUE FOR LESS IS ");
    // console.log(categoryGood);
    
    // console.log(valueBuy);
    
    categoryGood.disponible -= valueBuy;
    allCategorys.push(categoryGood);
    
    localStorage.setItem("category",JSON.stringify(allCategorys));
    
    
}