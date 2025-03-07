// Get the current active textarea
let currentTextarea = null;

// Add focus event listener to each textarea
document.querySelectorAll('.textarea-step').forEach(textarea => {
    textarea.addEventListener('focus', (event) => {
        currentTextarea = event.target;
    });
});

// Change Font Size
function changeFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    if (currentTextarea) {
        currentTextarea.style.fontSize = fontSize;
    }
}

// Toggle Bold
function toggleBold() {
    if (currentTextarea) {
        const currentFontWeight = window.getComputedStyle(currentTextarea).fontWeight;
        currentTextarea.style.fontWeight = currentFontWeight === 'bold' ? 'normal' : 'bold';
    }
}

// Toggle Italic
function toggleItalic() {
    if (currentTextarea) {
        const currentFontStyle = window.getComputedStyle(currentTextarea).fontStyle;
        currentTextarea.style.fontStyle = currentFontStyle === 'italic' ? 'normal' : 'italic';
    }
}

// Toggle Underline
function toggleUnderline() {
    if (currentTextarea) {
        const currentTextDecoration = window.getComputedStyle(currentTextarea).textDecoration;
        currentTextarea.style.textDecoration = currentTextDecoration === 'underline' ? 'none' : 'underline';
    }
}