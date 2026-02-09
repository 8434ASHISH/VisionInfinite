let currentBase64 = null;

document.getElementById('imageInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        currentBase64 = reader.result.split(',')[1];
        const img = document.getElementById('displayImg');
        img.src = reader.result;
        img.classList.remove('hidden');
        document.getElementById('waitText').classList.add('hidden');
    }
    reader.readAsDataURL(e.target.files[0]);
});

async function analyze(tone) {
    if (!currentBase64) return alert("Pehle photo upload karo bhai!");
    
    const container = document.getElementById('previewContainer');
    container.classList.add('active-scan');
    
    const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: currentBase64, tone: tone })
    });

    const data = await response.json();
    container.classList.remove('active-scan');
    
    const output = document.getElementById('outputCard');
    output.classList.remove('hidden');
    document.getElementById('responseText').innerText = data.text;
    
    // Auto-Speak for Blind Users
    const speech = new SpeechSynthesisUtterance(data.text);
    window.speechSynthesis.speak(speech);
}
