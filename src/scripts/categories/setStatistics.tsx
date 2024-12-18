import { colors } from "../../utils/colors/colors";



export const setStatistics = (data:any) =>{
    const dataNormal:any={
        labels:[],
        datasets:[
            {
                data:[],
                backgroundColor:colors,
            }
        ]
    };
    console.log("THE DATA IN FOR IS ");
    
    for(const x of data){
        console.log(x);
        
        const value=Number(x.value);
        dataNormal.labels.push(x.purchaseName);
        dataNormal.datasets[0].data.push(value);
    }
    return dataNormal;
}