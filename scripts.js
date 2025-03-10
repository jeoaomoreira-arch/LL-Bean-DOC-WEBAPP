// Function to generate and copy formatted note
document.getElementById("generate-btn").addEventListener("click", function () {

    // Collect step textareas dynamically
    const stepElements = document.querySelectorAll("#steps-container .textarea-step");
    let actions = [];
    
    stepElements.forEach((step, index) => {
        if (step.value.trim() !== "") {
            actions.push(`${index + 1}. ${step.value.trim()}`);
        }
    });

    const formattedNote = `Troubleshooting Steps:\n\nActions taken:\n${actions.join("\n")}`;

    // Display the generated note in the correct textarea
    document.getElementById("note-gened").value = formattedNote;

    // Copy to clipboard
    navigator.clipboard.writeText(formattedNote).then(() => {
        showGeneratedMessage();
    }).catch(() => {
        toastError("Failed to copy note.");
    });

    // Add animation effect to the button on click
    const generateBtn = document.getElementById("generate-btn");
    generateBtn.classList.add("animate-click");
    setTimeout(() => {
        generateBtn.classList.remove("animate-click");
    }, 300);
});

// Function to show a generated message
function showGeneratedMessage() {
    const messageDiv = document.getElementById("generated-message");
    messageDiv.classList.remove("hidden"); // Show the message
    messageDiv.classList.add("fade-in");

    setTimeout(() => {
        messageDiv.classList.add("fade-out");
        setTimeout(() => {
            messageDiv.classList.add("hidden"); // Hide again
            messageDiv.classList.remove("fade-in", "fade-out");
        }, 500);
    }, 2000); // Message stays for 2 seconds
}


import { UserManager } from "oidc-client-ts";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_Uw7q14jtx",
    client_id: "11eg0dk9svc3881ulqu1oqvglm",
    redirect_uri: "https://mososolutions.com",
    response_type: "code",
    scope: "email openid phone"
};

// create a UserManager instance
export const userManager = new UserManager({
    ...cognitoAuthConfig,
});

export async function signOutRedirect () {
    const clientId = "11eg0dk9svc3881ulqu1oqvglm";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://us-east-2uw7q14jtx.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};