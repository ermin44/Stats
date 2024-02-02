function updateProgressBar(barId, currentValue, maxValue) {
    const percentage = Math.min((currentValue / maxValue) * 100, 100); // Ensures max percentage is 100
    document.getElementById(barId).style.width = percentage + '%';
}

function updateValues() {
    // Assuming a static max value for demonstration
    const maxValue = 10000;
    
    // Get values from input fields and parse them as integers
    const israelValue = parseInt(document.getElementById('israelInput').value, 10);
    const palestineValue = parseInt(document.getElementById('palestineInput').value, 10);
    
    // Check if the input value for Israel is a valid number before updating
    if (!isNaN(israelValue)) {
        updateProgressBar('israelBar', israelValue, maxValue);
    }
    
    // Check if the input value for Palestine is a valid number before updating
    if (!isNaN(palestineValue)) {
        updateProgressBar('palestineBar', palestineValue, maxValue);
    }
}
const defaultValues = {
    "2013": { israel: 3000, palestine: 1000 },
    "2014": { israel: 3200, palestine: 2700 },
    "2015": { israel: 3000, palestine: 100 },
    "2016": { israel: 3200, palestine: 2400 },
    "2017": { israel: 500, palestine: 2000 },
    "2018": { israel: 3200, palestine: 2100 },
    "2019": { israel: 3000, palestine: 6600 },
    "2020": { israel: 3200, palestine: 2100 },
    "2021": { israel: 4400, palestine: 2000 },
    "2022": { israel: 5200, palestine: 2100 },
    "2023": { israel: 9900, palestine: 2000 },
    "2024": { israel: 1000, palestine: 8000 },
};

document.querySelectorAll('.yearBtn').forEach(button => {
    button.addEventListener('click', function() {
        const year = this.textContent;
        const values = defaultValues[year];
        
        if (values) {
            updateProgressBar('israelBar', values.israel, 10000);
            updateProgressBar('palestineBar', values.palestine, 10000);
        }
    });
});


var ctx = document.getElementById('myPieChart').getContext('2d');
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [10, 20, 30], // Your data goes here
            backgroundColor: ['red', 'blue', 'green'], // Customize colors
            // Add border or spacing effects if needed
        }],
        labels: ['Red', 'Blue', 'Green'] // Labels for your data
    },
    options: {
        // Customize tooltips
        responsive: false,
        maintainAspectRatio: true,
        aspectRatio: 1, 
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    // Customize tooltip
                    var label = data.labels[tooltipItem.index] || '';
                    return label + ': ' + data.datasets[0].data[tooltipItem.index];
                }
            }
        },
        // Implement hover styling changes here
        hover: {
            mode: 'nearest',
            intersect: true,
            onHover: function(e, chartElement) {
                if (chartElement.length) {
                    hoveredSegmentIndex = chartElement[0]._index;
                } else {
                    hoveredSegmentIndex = null;
                }
                this.draw(); // Force redraw to update the hover effect
            }
        },
        animation: {
            duration: 0, // Turn off animation to make the effect more immediate
        },
        plugins: {
            // Custom plugin to draw effects or additional elements on the chart
            afterDraw: function(chart) {
                if (hoveredSegmentIndex !== null) {
                    var ctx = chart.ctx;
                    var segment = chart.getDatasetMeta(0).data[hoveredSegmentIndex];

                    // Example: Draw an outer glow or a border around the hovered segment
                    ctx.save();
                    ctx.lineWidth = 5; // Set the line width or 'glow' size
                    ctx.strokeStyle = 'gold'; // Choose a color for the highlight effect
                    
                    // Create the highlight effect using arc method
                    var radiusPlus = segment.outerRadius + 5; // Increase radius for the effect
                    ctx.beginPath();
                    ctx.arc(segment._model.x, segment._model.y, radiusPlus, segment._model.startAngle, segment._model.endAngle);
                    ctx.arc(segment._model.x, segment._model.y, segment.innerRadius, segment._model.endAngle, segment._model.startAngle, true);
                    ctx.closePath();
                    ctx.stroke();

                    ctx.restore();
                }
            }
        }
    }
});