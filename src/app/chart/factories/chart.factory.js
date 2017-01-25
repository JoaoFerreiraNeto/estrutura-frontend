import Chart from 'chart.js';
import moment from 'moment-timezone';
moment.tz.setDefault('America/Sao_Paulo');

function chartFactory() {
    const chart = {
        cpu: cpu,
        memory: memory,
        storage: storage
    };

    return chart;

    ////////////

    function storage(canvas, metrics) {
        const options = {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    display: false
                }],
                xAxes: [{
                    display: false
                }]
            }
        };
        const data = {
            labels: ['Usado (%)', 'Disponível (%)'],
            datasets: [{
                data: [metrics.storage, 100 - metrics.storage],
                backgroundColor: ['rgb(255,114,18)', 'rgb(239,244,230)']
            }]
        };

        Chart.Doughnut(canvas, {data: data, options: options});
    }

    function memory(canvas, metrics) {
        const options = {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {display: false}
                }],
                xAxes: [{
                    gridLines: {display: false}
                }]
            }
        };
        const data = {
            labels: Array.from(Object.keys(metrics.memory), date => moment(moment.utc(date).toDate()).format('h:mm a')),
            datasets: [{
                label: 'Memória em uso (%)',
                backgroundColor: 'rgb(239,244,230)',
                borderColor: 'rgb(255,114,18)',
                data: Object.values(metrics.memory),
            }]
        };

        Chart.Line(canvas, {data: data, options: options});
    }

    function cpu(canvas, metrics) {
        const options = {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {display: false}
                }],
                xAxes: [{
                    gridLines: {display: false}
                }]
            }
        };
        const data = {
            labels: Array.from(Object.keys(metrics.cpu), date => moment(moment.utc(date).toDate()).format('h:mm a')),
            datasets: [{
                label: 'Uso da CPU (%)',
                backgroundColor: 'rgb(255,114,18)',
                data: Object.values(metrics.cpu),
            }]
        };
        Chart.Bar(canvas, {data: data, options: options});
    }
}

export default chartFactory;
