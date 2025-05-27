
'use client'; // This utility will be used in Client Components

import { mixpanel } from '../../lib/mixpanelClient'; // Your existing Mixpanel client instance

interface UserAuthProperties {
  userId: string;
  email: string;
  loginMethod: 'OAuth' | 'Email/Password';
  userType?: 'individual' | 'business'; // Optional, for initial signup
}

interface WalletConnectionProperties {
  userId: string;
  walletAddress: string;
  connectionMethod: 'OAuth Callback Auto-Connect' | 'Email/Password Callback Auto-Connect' | 'OAuth Callback Re-Connect' | 'Email/Password Callback Re-Connect'  | 'Manual Connection'; 
  oldWalletAddress?: string | undefinded; // Optional for reconnected event
}


// --- User Authentication & Profile Tracking ---

/**
 * Identifies the user in Mixpanel and sets/updates core profile properties on login.
 * To be called on *every* successful login.
 */
export const trackUserLoggedIn = (props: UserAuthProperties) => {
  if (!mixpanel.identify) {
    console.warn('Mixpanel not initialized for identify/people set. Skipping trackUserLoggedIn.');
    return;
  }

  mixpanel.identify(props.userId); // Always identify on login

  // Set/update core profile properties
  mixpanel.people.set({
    '$email': props.email,
    'Last Login Date': new Date().toISOString(),
    'Last Login Method': props.loginMethod,
    // Conditionally set userType if provided (it might not always be on login)
    ...(props.userType && { 'User Type': props.userType }),
  });

  // Track the login event
  mixpanel.track('User Logged In', {
    'Login Method': props.loginMethod,
    ...(props.userType && { 'User Type': props.userType }),
  });
};

/**
 * Tracks a new user signup and sets initial one-time profile properties.
 * To be called *only* when a user registers for the first time.
 */
export const trackUserSignedUp = (props: UserAuthProperties) => {
  if (!mixpanel.identify) {
    console.warn('Mixpanel not initialized for identify/people set. Skipping trackUserSignedUp.');
    return;
  }

  mixpanel.identify(props.userId); // Identify the new user
  
  // Set initial one-time properties
  mixpanel.people.set_once({
    'First Seen Date': new Date().toISOString(),
    'Signup Method': props.loginMethod,
    'Initial User Type': props.userType, // More explicit for initial value
  });

  // Also set/update regular properties on signup (like email and current user type)
  mixpanel.people.set({
    '$email': props.email,
    'Last Login Date': new Date().toISOString(), // Signup is also a form of login
    'Last Login Method': props.loginMethod,
    'User Type': props.userType, // Set current user type
  });

  // Track the signup event
  mixpanel.track('User Signed Up', {
    'Signup Method': props.loginMethod,
    'User Type': props.userType,
    'Email': props.email,
  });
};

/**
 * Tracks a user logout and resets Mixpanel identity.
 * To be called on user logout.
 */
export const trackUserLoggedOut = (userId: string) => {
  if (!mixpanel.track) {
    console.warn('Mixpanel not initialized. Skipping trackUserLoggedOut.');
    return;
  }
  mixpanel.track('User Logged Out', {
    'User ID': userId,
  });
  mixpanel.reset(); // Crucial for new anonymous sessions
};


// --- Wallet Connection Tracking ---

/**
 * Tracks a wallet connection event and updates user profile with wallet address.
 */
export const trackWalletConnected = (props: WalletConnectionProperties) => {
  if (!mixpanel.track) {
    console.warn('Mixpanel not initialized. Skipping trackWalletConnected.');
    return;
  }

  // Ensure user is identified before setting people properties related to wallet
  // This is handled in AuthCallback, but good to be mindful
  mixpanel.identify(props.userId);

  mixpanel.people.set({
    'Wallet Address': props.walletAddress,
    'Wallet Connected Date': new Date().toISOString(),
  });
  mixpanel.track('Wallet Connected', {
    'Wallet Address': props.walletAddress,
    'Connection Method': props.connectionMethod,
  });
};

/**
 * Tracks a wallet reconnection event (when a different wallet is connected or an existing one is reconnected).
 */
export const trackWalletReconnected = (props: WalletConnectionProperties) => {
  if (!mixpanel.track) {
    console.warn('Mixpanel not initialized. Skipping trackWalletReconnected.');
    return;
  }

  mixpanel.identify(props.userId);

  mixpanel.people.set({
    'Wallet Address': props.walletAddress, // Update to the new address
    'Wallet Reconnected Date': new Date().toISOString(),
  });
  mixpanel.track('Wallet Reconnected', {
    'New Wallet Address': props.walletAddress,
    'Old Wallet Address': props.oldWalletAddress || 'N/A', // Pass old address if available
    'Connection Method': props.connectionMethod,
  });
};

// --- Error Tracking (Optional but Recommended) ---

export const trackAuthCallbackError = (error: Error, loginMethod: string, userId?: string) => {
  if (!mixpanel.track) {
    console.warn('Mixpanel not initialized. Skipping trackAuthCallbackError.');
    return;
  }
  mixpanel.track('Auth Callback Error', {
    'Error Message': error.message,
    'Error Stack': error.stack,
    'Login Method': loginMethod,
    'User ID (if available)': userId || 'N/A',
  });
};

export const trackWalletConnectionFailed = (error: Error, connectionMethod: string, userId?: string) => {
    if (!mixpanel.track) {
        console.warn('Mixpanel not initialized. Skipping trackWalletConnectionFailed.');
        return;
    }
    mixpanel.track('Wallet Connection Failed', {
        'Error': error.message,
        'Connection Method': connectionMethod,
        'User ID (if available)': userId || 'N/A',
    });
};

