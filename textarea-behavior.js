document.addEventListener("DOMContentLoaded", function () {
    const textareas = document.querySelectorAll(".textarea-step");

    textareas.forEach(textarea => {
        textarea.addEventListener("input", function () {
            this.style.height = "auto"; // Reset height to auto
            this.style.height = this.scrollHeight + "px"; // Set height to fit content
        });

        // Initialize height in case of pre-filled content
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    });
});


/**
 * Adds an event listener to all textareas on the page.
 * When the `Alt` key is pressed:
 * - Prevents the default behavior.
 * - Detects the current line’s indentation style (`>`, `•`, or none).
 * - Inserts a new line with the appropriate list indicator.
 * - Moves the cursor to the correct position after insertion.
 */
// Apply event listener to all textareas
// Apply event listener to all textareas in the form
document.querySelectorAll("textarea").forEach(textarea => {
    textarea.addEventListener("keydown", function (e) {
        if (e.key === "Alt") {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const value = this.value;
            const before = value.substring(0, start);
            const after = value.substring(end);
            const currentLine = before.split("").pop();
            let newLine;

            if (currentLine.startsWith("")) {
                newLine = before + "\n  >> ";
            } else if (currentLine.startsWith(" • ")) {
                newLine = before + "\n  • ";
            } else {
                newLine = before + "\n ";
            }

            this.value = newLine + after;
            this.selectionStart = this.selectionEnd = newLine.length;
        }
    });
});


