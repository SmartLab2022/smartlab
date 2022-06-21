var graphCanvas = document.getElementById("chart_canvas");
var graphContext = graphCanvas.getContext('2d');
var myChart;
// var graphCtx 
var chartContainer = document.getElementById("chartContainer");
window.onload = () => {
    graphCanvas.style.height = "80%";
    graphCanvas.style.width = "65%";
    if (document.title == 'Home')
        getFootPrints('page');
    else
        getFootPrints('Demo');
};
function getFootPrints(type) {
    if (myChart != null)
        myChart.destroy();
    var data = {
        'type': type
    };
    $.ajax({
        type: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        url: 'http://127.0.0.1:5000/getFootPrints',
        crossDomain: true,
        data: JSON.stringify(data),
        success: function (response) {
            //console.log(response)
            if (type == 'page' || type == 'experiment')
                drawPie(response);
            else
                drawDoughnut(response);
        }
    });
}
function drawPie(data) {
    var xValues = [];
    var yValues = [];
    var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145",
        "#8464a0",
        "#cea9bc",
        "#dd584e",
        "#a0595d",
        "#84c43c"
    ];
    for (var i = 0; i < data.length; i++) {
        xValues[i] = data[i]['_id'];
        yValues[i] = data[i]['sum_min'];
    }
    myChart = new Chart('chart_canvas', {
        type: 'pie',
        data: {
            labels: xValues,
            datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
        }
    });
}
function drawDoughnut(data) {
    var xValues = [];
    var yValues = [];
    var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145",
        "#8464a0",
        "#cea9bc",
        "#dd584e",
        "#a0595d",
        "#84c43c"
    ];
    for (var i = 0; i < data.length; i++) {
        if (data[i]['_id'] != null)
            xValues[i] = data[i]['_id'];
        else
            xValues[i] = 'Others';
        yValues[i] = data[i]['sum_min'];
    }
    myChart = new Chart('chart_canvas', {
        type: 'doughnut',
        data: {
            labels: xValues,
            datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
        }
    });
}
//# sourceMappingURL=footPrints.js.map