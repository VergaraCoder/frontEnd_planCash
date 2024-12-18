import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { setStatistics } from "../scripts/categories/setStatistics";

// Registro de componentes
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const data2 = {
  labels: ["pepino"],
  datasets: [
    {
      data: [300],
      backgroundColor: ["red"],
    },
    
  ],
};

const options:any = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    datalabels: {
      color: "black",
      formatter: (value:any, ctx:any) => {
        const total = ctx.dataset.data.reduce((acc:any, curr:any) => acc + curr, 0);
        const percentage = ((value / total) * 100).toFixed(1) + "%";
        return percentage;
      },
      anchor: "end",
      align: "start",
      offset: 10,
      font: {
        weight: "bold",
      },
    },
  },
};

interface Props{
    dataSet:any;
}

const PieChart = ({dataSet}:any) => {

    // const [dataToshow,setDataToShow]=useState<any>();

    useEffect(()=>{
      const funcion = async () =>{
        console.log("The data is ");
        console.log(dataSet);

      }
      funcion();
       
    },[]);

    return <Pie data={dataSet} options={options} />;
};

export default PieChart;
