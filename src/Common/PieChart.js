import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register( ArcElement, Tooltip, Title, );


const PieChart = (props) => {

    const options = {
        responsive: true,
        maintainAspectRatio: true,  
        plugins: {
            legend:{
                display: true
            },
            title: {
                display: true,
                text: props.data.Name,
              },
        }
      };

      const data = {
        labels: props.labels,
        datasets: [
          {
            label: props.data.Name,
            data: props.data.elements,
            backgroundColor: props.data.color,
          },
        ],
      };

      
    return <Pie options={options} data={data} />;
} 

export default PieChart;
