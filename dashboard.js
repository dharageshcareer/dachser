/*
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
}*/

var mychart1
var mychart2
var mychart3
function userkpipie(){
  console.log("My chart",mychart1)
  if ( mychart1 != null && mychart1 != "" && mychart1 != undefined ) {
    mychart1.dispose();
}
 
  
   $('#userkpipiediv').show();
    var chartDom = document.getElementById('userkpipie');
    var myChart1 = echarts.init(chartDom);
    
    
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
                value: kpi[0],
                name: 'Import Declaration',
              },
              { value: kpi[1], name: 'Arrival' }
            ],
            
            
          }
        ]
      };
    
      option && myChart1.setOption(option);
}
async function userwtpie(){
  if ( mychart2 != null && mychart2 != "" && mychart2 != undefined ) {
    mychart2.dispose();
}

  $('#userwtpiediv').show();

        var chartDom = document.getElementById('userwtpie');
        var myChart2 = echarts.init(chartDom);
        
        
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
                    value: wt[0],
                    name: 'Import Declaration',
                  },
                  { value: wt[1], name: 'Arrival' }
                ],
                
                
              }
            ]
          };
        
          option && myChart2.setOption(option);
}
function userwtkpiweek(){
  if ( chartDom != null && chartDom != "" && chartDom != undefined ) {
    console.log("Removing Chart 3")
    chartDom.dispose();
   }
  $('#userwtkpiweekdiv').show();
        if(chartDom){
          console.log(",]Mkainh Dom Empty")
          chartDom.dispose();
        }
        var chartDom = document.getElementById('userwtkpiweek');
        var myChart3 = echarts.init(chartDom);
        console.log("ChartDom ",chartDom)
        
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
            data: dict["Dates"],
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
            data: dict["kPI"]
          },
          {
            name: 'Working Time',
            type: 'line',
            data: dict["work time"]
          },
        ]
      };
      option && myChart3.setOption(option);

}
async function getdata(){
  user_id=document.getElementById("myInput").value
  //user_id=1001
  console.log("Getting report for User",user_id)
  checkurl1 ="http://dachserkpi.westus.cloudapp.azure.com:5000/perDay?user_id="+user_id;
  checkurl2 ="http://dachserkpi.westus.cloudapp.azure.com:5000/week?user_id="+user_id;
  console.log(checkurl1,checkurl2)
  const response = await fetch(checkurl1);
  var data = await response.json();
  console.log(data)
  kpi=data[0]
  wt=data[1]
  console.log("KPI ",kpi)
  console.log("WT ",wt)
  const response2 = await fetch(checkurl2);
  var data2 = await response2.json();
  dict=data2
  console.log(data2)
  $('#userwtkpiweek').empty();
  $('#userwtpie').empty();
  $('#userkpipie').empty();
  
  $('#userwtkpiweek').show();
  $('#userwtpie').show();
  $('#userkpipie').show();
  
}
async function loadchart(){
  await getdata()
  userkpipie();
  userwtpie();
  userwtkpiweek();
  
}
window.onload = function(e){ 
  
  $('#userwtkpiweek').hide();
  $('#userwtpie').hide();
  $('#userkpipie').hide();
  //piechart();
 //barchart();
 
}