let db;
const request = indexedDB.open("FormDB", 1);

request.onupgradeneeded = function (event) {
    let db = event.target.result;
    if (!db.objectStoreNames.contains("formData")) {
        db.createObjectStore("formData", { keyPath: "id" });
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
    loadData(); // Load saved data when page opens
};

request.onerror = function () {
    console.error("Error opening database.");
};

// Function to save steps and notepad data
function saveData() {
    const steps = [];
    document.querySelectorAll(".textarea-step").forEach((textarea) => {
        steps.push(textarea.value);
    });

    let notepadValue = document.getElementById("notepad").value || "";

    let data = {
        id: 1,
        steps: steps,
        notepad: notepadValue
    };

    let transaction = db.transaction(["formData"], "readwrite");
    let store = transaction.objectStore("formData");
    store.put(data);
}

// Function to load saved data from IndexedDB
function loadData() {
    let transaction = db.transaction(["formData"], "readonly");
    let store = transaction.objectStore("formData");

    let request = store.get(1);

    request.onsuccess = function () {
        let savedData = request.result;

        if (savedData) {
            let savedSteps = savedData.steps || [];

            // Ensure steps container is empty before loading
            document.getElementById("steps-container").innerHTML = "";

            // Restore saved steps, or initialize 7 if empty
            for (let i = 0; i < Math.max(7, savedSteps.length); i++) {
                addStep(savedSteps[i] || ""); // Pass saved content
            }

            // Restore notepad data
            document.getElementById("notepad").value = savedData.notepad || "";
        } else {
            // If no data exists, initialize 7 empty steps
            for (let i = 0; i < 7; i++) {
                addStep("");
            }
        }
    };
}

// Function to add a new step dynamically
function addStep(content = "") {
    const container = document.getElementById("steps-container");
    const existingSteps = container.getElementsByClassName("textarea-step");
    const newStepNumber = existingSteps.length + 1;

    // Create new textarea
    const newTextarea = document.createElement("textarea");
    newTextarea.id = `step-${newStepNumber}`;
    newTextarea.placeholder = `${newStepNumber}...`;
    newTextarea.className = "resize-y input textarea-step";
    newTextarea.value = content; // Set value from saved data

    // Attach event listener for auto-saving
    newTextarea.addEventListener("input", saveData);

    container.appendChild(newTextarea);
}


// Listen for Ctrl + Shift key press
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey) { // Using Shift instead of Fn
        addStep();
    }
});

// Attach event listeners for saving on input
document.getElementById("notepad").addEventListener("input", saveData);
document.getElementById("add-step-button").addEventListener("click", () => addStep(""));

// Function to clear steps but keep notepad intact
function clearData() {
    let transaction = db.transaction(["formData"], "readwrite");
    let store = transaction.objectStore("formData");

    let request = store.get(1);

    request.onsuccess = function () {
        if (request.result) {
            let currentNotepadValue = request.result.notepad; // Preserve notepad value

            let newData = {
                id: 1,
                steps: Array(7).fill(""), // Reset steps to 7 empty ones
                notepad: currentNotepadValue // Keep the notepad content
            };

            store.put(newData); // Update IndexedDB

            // Reload to ensure UI shows exactly 7 empty steps
            location.reload();
        }
    };

    request.onerror = function () {
        console.error("Error clearing data.");
    };
}

// Ensure the trash button clears only steps
document.querySelector(".trash-button").addEventListener("click", clearData);
