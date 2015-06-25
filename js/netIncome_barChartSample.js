$(function () {
        $('#netIncomeContainer').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Radiology Diagnostic','Raidiology MRI', 'Radiology CT', 'Radiology IR']
            },            
            yAxis: {
                title: {
                    text: 'Net Income'
                },
                labels: {
                    formatter: function() {
                        return '$' + Highcharts.numberFormat(this.value, 0 );
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return  this.x +'<br/>'+
                        '<font color="blue">Net Income:</font> <b>$ '+ Highcharts.numberFormat(this.y, 0) + '</b>';
                }
            },
            colors: [
            '#41DB04'
            ],
            credits: {
                enabled: false
            },
            series: [{
                name: 'Net Income',
                data: [572, 306, {y:-62, color: 'red'} , {y:-1259, color: 'red'}]
            ,
		showInLegend: false
            }]
        });
    });    

