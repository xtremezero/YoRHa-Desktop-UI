document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".hoverButton");
    var sound = document.getElementById("hoverSound");

    buttons.forEach(function(button) {
        button.addEventListener("mouseenter", function() {
            sound.currentTime = 0; // Reset playback position
            sound.play();
        });
    });
});


function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('godot').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Godot Engine');
});

document.getElementById('blender').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Blender');
});

document.getElementById('defold').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Defold');
});

document.getElementById('flax').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Flax');
});

document.getElementById('ctjs').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/ctjs');
});

document.getElementById('turbowarp').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/TurboWarp');
});

document.getElementById('unigine').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Unigine SDK browser 2');
});

document.getElementById('unity').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Unity Hub');
});

document.getElementById('unreal').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Unreal Engine');
});

document.getElementById('upbge').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/UPBGE');
});


document.getElementById('itch').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/itch');
});

document.getElementById('steam').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Steam');
});

document.getElementById('epic').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Epic');
});

document.getElementById('gog').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/GOG');
});

document.getElementById('heroic').addEventListener('click', function() {
    fetchData('http://localhost:13597/run/Heroic');
});