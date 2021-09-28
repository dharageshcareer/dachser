function piechart(){
var chartDom = document.getElementById('pie');
var myChart = echarts.init(chartDom);


  option = {
    title: {
      text: 'Task Force Engagement',
      left: 'center'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: ['Import Declaration','Arrival']
    },
    tooltip: {},
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: [
          {
            value: 1548,
            name: 'Import Declaration',
          },
          { value: 735, name: 'Arrival' }
        ],
        
        
      }
    ]
  };

  option && myChart.setOption(option);
}
function barchart(){
    var chartDom = document.getElementById('bar');
    var myChart = echarts.init(chartDom);
    option = {
        title: {
            text: 'KPI and Working Time by Type',
            left: 'center'
          },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['KPI', 'Working Time']
        },
        tooltip: {},
        dataset: {
          source: [
            ['Type', 'KPI', 'Working Time'],
            ['Import Decleration', 43.3, 85.8],
            ['Arrival', 83.1, 73.4]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      };
      option && myChart.setOption(option);
}
function userkpipie(){
    var chartDom = document.getElementById('userkpipie');
    var myChart = echarts.init(chartDom);
    
    
      option = {
        title: {
          text: 'KPI by Type',
          left: 'center'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['Import Declaration','Arrival']
        },
        tooltip: {},
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {
                value: 548,
                name: 'Import Declaration',
              },
              { value: 735, name: 'Arrival' }
            ],
            
            
          }
        ]
      };
    
      option && myChart.setOption(option);
}
function userwtpie(){
        var chartDom = document.getElementById('userwtpie');
        var myChart = echarts.init(chartDom);
        
        
          option = {
            title: {
              text: 'Working Time by Type',
              left: 'center'
            },
            legend: {
              bottom: 10,
              left: 'center',
              data: ['Import Declaration','Arrival']
            },
            tooltip: {},
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                  {
                    value: 1048,
                    name: 'Import Declaration',
                  },
                  { value: 1035, name: 'Arrival' }
                ],
                
                
              }
            ]
          };
        
          option && myChart.setOption(option);
}
function userwtkpiweek(){
    var chartDom = document.getElementById('userwtkpiweek');
        var myChart = echarts.init(chartDom);
        
    option = {
        title: {
            text: 'User Productivity Over a week',
            left: 'center'
          },
          
           
    
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            
          }
        },
        legend: {
            bottom: 10,
            left: 'center',
          data: ['KPI', 'Working Time', 'Overall']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'KPI',
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: '{value} unit'
            }
          },
          {
            type: 'value',
            name: 'Working Time',
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: '{value} hours'
            }
          }
        ],
        series: [
          {
            name: 'KPI',
            type: 'bar',
            data: [
              5.0,4.0,6.0,5.0,6.0,10.0
            ]
          },
          {
            name: 'Working Time',
            type: 'line',
            data: [
              8.6,8.0,7.2,6.0,8.5,9.0
            ]
          },
        ]
      };
      option && myChart.setOption(option);

}

window.onload = function(e){ 
 piechart();
 barchart();
 userkpipie();
 userwtpie();
 userwtkpiweek();
}