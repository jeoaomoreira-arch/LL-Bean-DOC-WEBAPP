// Import UserManager from the installed npm package
import { UserManager } from "oidc-client-ts";

// Cognito authentication configuration
const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_Uw7q14jtx",
    client_id: "11eg0dk9svc3881ulqu1oqvglm",
    redirect_uri: "https://mososolutions.com",
    response_type: "code",
    scope: "email openid phone"
};

// Create a UserManager instance
export const userManager = new UserManager(cognitoAuthConfig);

// Sign-out function
export async function signOutRedirect() {
    const clientId = "11eg0dk9svc3881ulqu1oqvglm";
    const logoutUri = "https://mososolutions.com/";
    const cognitoDomain = "https://us-east-2_Uw7q14jtx.auth.us-east-2.amazoncognito.com";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};
