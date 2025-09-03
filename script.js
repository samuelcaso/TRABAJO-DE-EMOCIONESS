const emotions = {
    tristeza: 'A photorealistic cinematic image conveying deep sadness: a lonely person standing in the rain on a deserted street at night, high detail, realistic lighting, emotional atmosphere, 8k, highly detailed',
    libertad: 'A photorealistic cinematic image conveying freedom: a person with arms outstretched on a mountain top overlooking vast landscapes, blue sky, wind blowing hair, high detail, realistic, 8k, highly detailed',
    redencion: 'A photorealistic cinematic image conveying redemption: a person rising from darkness into light, symbolic rays of sun breaking through clouds, hopeful expression, high detail, realistic, 8k, highly detailed',
    felicidad: 'A photorealistic cinematic image conveying happiness: a group of friends laughing in a sunny park, vibrant colors, joyful expressions, high detail, realistic lighting, 8k, highly detailed'
};

function getRandomEmotion() {
    const keys = Object.keys(emotions);
    return keys[Math.floor(Math.random() * keys.length)];
}

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

async function generateArt() {
    const text = document.getElementById('text-input').value.trim().toLowerCase();
    if (text !== "generame una imagen") {
        alert("Por favor, escribe exactamente 'generame una imagen' para generar la imagen.");
        return;
    }

    showLoading(true);
    const emotion = getRandomEmotion();
    const prompt = emotions[emotion];

    try {
        const imageElement = await puter.ai.txt2img(prompt);
        imageElement.id = 'generated-image';
        imageElement.alt = `Imagen de ${emotion}`;

        const container = document.getElementById('image-container');
        container.innerHTML = '';
        container.appendChild(imageElement);

        document.getElementById('save-btn').style.display = 'block';
        document.getElementById('save-btn').onclick = () => {
            const link = document.createElement('a');
            link.download = `imagen-${emotion}.png`;
            link.href = imageElement.src;
            link.click();
        };
    } catch (error) {
        alert('Error generating image: ' + error.message);
    } finally {
        showLoading(false);
    }
}

document.getElementById('generate-btn').addEventListener('click', generateArt);