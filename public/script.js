
document.getElementById('btn').addEventListener('click', function() {
    var paragraph = document.getElementById('paragraph');
    paragraph.style.color = getRandomColor();
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];

        array.forEach(element => {
            
        });
    }
    
    return color;
}
