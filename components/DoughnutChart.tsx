"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        labels : ["Account 1", "Account 2", "Account 3"],
        datasets: [
            {
                label:"Banks",
                data: [300, 50, 100],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
            }
        ]
    }
    return <Doughnut data={data}
    options={{
        cutout:"60%",
        plugins:{
            legend:{
                display:false,
            }
        }
    }} />
        
}

export default DoughnutChart