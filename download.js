export async function downloadImage(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        link.click();
         link.remove();
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}

export function handleDownloadButtonClick(event) {
    if (event.target.classList.contains('download-button')) {
        event.preventDefault();  
        const imageUrl = event.target.dataset.url;
        const fileName = event.target.dataset.filename;
        downloadImage(imageUrl, fileName);
    }
}