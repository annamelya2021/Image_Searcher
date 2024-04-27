
export function showAlert(message) {
   
    if (!alertContainer) {
        console.error('Alert container not found in the DOM');
        return;
    }

    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message || 'Sorry, an error occurred'; 
    alertContainer.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 5000);
}