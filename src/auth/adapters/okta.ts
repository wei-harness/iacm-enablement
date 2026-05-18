import { testHarnessUser } from "../../utils";
import OktaAuth, { type AuthState } from "@okta/okta-auth-js";

const oktaConfig = {
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  issuer: import.meta.env.VITE_OKTA_ISSUER,
  redirectUri: `${window.location.origin}${import.meta.env.VITE_OKTA_CALLBACK_PATH}`,
  scopes: ["openid", "profile", "email", "offline_access"],
  responseType: "code" as const,
  pkce: true,
  tokenManager: {
    autoRenew: true,
    autoRemove: true,
    secure: import.meta.env.VITE_OKTA_TOKEN_SECURE === "true",
  },
};

export const oktaAuth = new OktaAuth(oktaConfig);

export const getUserOkta = async (authState: AuthState | null = null) => {
  let newAuthState = authState;
  if (!newAuthState) {
    await oktaAuth.authStateManager.updateAuthState();
    newAuthState = oktaAuth.authStateManager.getAuthState();
  }
  return newAuthState?.idToken?.claims;
};

export const signInOkta = async () => {
  await oktaAuth.signInWithRedirect({ originalUri: window.location.href });
};

export const signOutOkta = async () => {
  await oktaAuth.signOut();
};

export const setTokenOkta = async (): Promise<string> => {
  try {
    await oktaAuth.authStateManager.updateAuthState();
    const authState = oktaAuth.authStateManager.getAuthState();

    if (authState === null || !authState.isAuthenticated) {
      return "";
    }

    const user = await getUserOkta(authState);
    if (!user) {
      return "";
    }

    const isHarnessUser = testHarnessUser(user);
    if (!isHarnessUser) {
      return "";
    }

    const accessToken = authState.accessToken?.accessToken;
    if (!accessToken) {
      return "";
    }

    return accessToken;
  } catch (error) {
    console.error("Error getting Okta token:", error);
    return "";
  }
};

export const refreshTokenOkta = async (): Promise<string> => {
  try {
    // Get the current token manager
    const tokenManager = oktaAuth.tokenManager;

    // Get the current access token
    const accessToken = await tokenManager.get("accessToken");

    if (!accessToken) {
      return "";
    }

    const expiresAt = accessToken.expiresAt;
    const now = Math.floor(Date.now() / 1000);
    const fiveMinutes = 5 * 60;

    if (expiresAt && expiresAt - now < fiveMinutes) {
      await tokenManager.renew("accessToken");
      const newAccessToken = await tokenManager.get("accessToken");
      return (newAccessToken as any)?.accessToken || "";
    }

    return (accessToken as any).accessToken || "";
  } catch (error) {
    console.error("Error refreshing Okta token:", error);
    // If refresh fails, try to get a fresh token
    return await setTokenOkta();
  }
};

export const getTokenExpiration = async (): Promise<number | null> => {
  try {
    const tokenManager = oktaAuth.tokenManager;
    const accessToken = await tokenManager.get("accessToken");
    return accessToken?.expiresAt || null;
  } catch (error) {
    console.error("Error getting token expiration:", error);
    return null;
  }
};

export const isTokenExpired = async (): Promise<boolean> => {
  try {
    const expiresAt = await getTokenExpiration();
    if (!expiresAt) return true;

    const now = Math.floor(Date.now() / 1000);
    return now >= expiresAt;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

export const ensureValidToken = async (): Promise<string> => {
  try {
    // First check if token is expired
    const expired = await isTokenExpired();

    if (expired) {
      // Token is expired, try to refresh it
      const refreshedToken = await refreshTokenOkta();
      if (!refreshedToken) {
        return await setTokenOkta();
      }
      return refreshedToken;
    } else {
      // Token is still valid, get it
      return await setTokenOkta();
    }
  } catch (error) {
    console.error("Error ensuring valid token:", error);
    return "";
  }
};
