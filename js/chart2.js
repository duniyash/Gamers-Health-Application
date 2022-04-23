var ctx = document.getElementById('doughnut').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Eye Strains', 'Carpel Tunnel', 'Back Posture', 'Neck Strains'],

        datasets: [{
            label: 'Excercises',
            data: [42, 12, 8, 6],
            backgroundColor: [
                'rgba(133, 43, 16)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(120, 46, 139,1)'

            ],
            borderColor: [
                'rgba(133, 43, 16)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(120, 46, 139,1)'

            ],
            borderWidth: 1
        }]

    },
    options: {
        responsive: true
    }
});