
async function grafica(sum1, sum2,sum3){
      
        const dataSource = {
  chart: {
    caption: "Inversión Pública Terrirorial [2020]",
  subcation:"Municipio de Medellín",
    xaxisname: "Terrirorio",
    yaxisname: "Millones de pesos",
    numbersuffix: "K",
    theme: "zune"
  },
  data: [
    {
      label: "Popular",
      value: sum1
    },
    {
        label: "Santa Cruz",
        value: sum2
      },
      {
        label: "Manrique",
        value: sum3
      }
  
  
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "column2d",
    renderAt: "chart-container",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }).render();
});
 
    }