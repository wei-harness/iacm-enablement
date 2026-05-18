# Okta Authentication Setup

This document describes the Okta authentication implementation with refresh token support.

## Configuration

The Okta configuration includes:

- **Client ID**: `0oabo2if2sxJ2nlMM5d7`
- **Issuer**: `https://dev-06350776.okta.com/oauth2/ausboy4bp0Teyt9sx5d7`
- **Scopes**: `openid`, `profile`, `email`, `offline_access`
- **Response Type**: `code` (enables refresh tokens)
- **PKCE**: Enabled for security
- **Token Manager**: Auto-renew and auto-remove enabled

## Key Features

### 1. Refresh Token Support

- Added `offline_access` scope to enable refresh tokens
- Configured `responseType: 'code'` for authorization code flow
- Implemented automatic token refresh when tokens are about to expire

### 2. Token Management

- **`setTokenOkta()`**: Gets the current access token from Okta
- **`refreshTokenOkta()`**: Refreshes the access token using refresh token
- **`ensureValidToken()`**: Ensures a valid token is available (checks expiration and refreshes if needed)
- **`getTokenExpiration()`**: Gets the actual token expiration time from Okta
- **`isTokenExpired()`**: Checks if the current token is expired

### 3. Automatic Token Refresh

- API requests automatically use `ensureValidToken()` to get valid tokens
- Tokens are refreshed 5 minutes before expiration
- Failed refresh attempts fall back to getting a fresh token

### 4. Session Management

- `TokenSession` component now uses actual token expiration times
- Automatic session renewal with proper error handling
- User-friendly expiration warnings and renewal prompts

## Usage

### Basic Authentication

```typescript
import { signInApp, signOutApp, getUser } from "@/src/core/auth";

// Sign in
await signInApp();

// Get user info
const user = await getUser();

// Sign out
await signOutApp();
```

### Token Management

```typescript
import { setAuthToken, refreshAuthToken, getValidToken } from "@/src/core/auth";

// Set initial token
await setAuthToken();

// Refresh token manually
await refreshAuthToken();

// Get valid token (automatically refreshes if needed)
const token = await getValidToken();
```

### API Requests

API requests automatically handle token refresh through the axios interceptor in `src/core/libs/api-client.ts`.

## Security Considerations

1. **Refresh Tokens**: Stored securely by Okta Auth JS
2. **Token Expiration**: Automatic refresh prevents expired token usage
3. **Error Handling**: Graceful fallback when refresh fails
4. **PKCE**: Enabled for additional security

## Troubleshooting

### Common Issues

1. **Token Refresh Fails**: Check if refresh token is still valid
2. **Session Expires**: User may need to re-authenticate
3. **API 401 Errors**: Usually indicates token refresh is needed

### Debugging

Enable console logging to see token refresh attempts and errors:

```typescript
// Check token expiration
const expired = await checkTokenExpiration();
console.log("Token expired:", expired);

// Get token expiration time
const expiration = await getTokenExpirationTime();
console.log("Token expires at:", new Date(expiration * 1000));
```
