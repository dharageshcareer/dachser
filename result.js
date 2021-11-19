window.onload = function(e){ 
  console.log("Loggin")
var chartDom = document.getElementById('gauge');
var myChart = echarts.init(chartDom);
var option;

option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [  
        {
          value: 50,
          name: 'SCORE'
        }
      ]
    }
  ]
};

option && myChart.setOption(option);
}
