var ctx = document.getElementById('lineChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Game Play in Minutes per day',
            data: [180, 60, 362, 360, 560, 665, 120, 254, 190,190],
            backgroundColor: [
                '#132119'

            ],
            borderColor: '#389b29',

            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio :false
    }
});