const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const enhancedImage = document.getElementById('enhancedImage');
const downloadBtn = document.getElementById('downloadBtn');
const resultContainer = document.querySelector('.result-container');

const apiKey = '3e262de2-37fa-401c-abff-083abae8d5d1'; // Your DeepAI API Key

uploadBtn.addEventListener('click', async () => {
    const file = imageInput.files[0];
    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('https://api.deepai.org/api/torch-srgan', {
            method: 'POST',
            headers: {
                'Api-Key': apiKey,  // DeepAI API Key
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok && data.output_url) {
            enhancedImage.src = data.output_url;
            downloadBtn.href = data.output_url;
            resultContainer.style.display = 'block'; // Show the enhanced image section
        } else {
            console.error("Error:", data);
            alert("Failed to enhance image. Try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});
