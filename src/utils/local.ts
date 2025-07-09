import { encryptToken, decryptToken } from "./crypto";

const SECRET = process.env.NEXT_PUBLIC_MATRIX_TOKEN_SECRET!;


async function storeEncrypted(key: string, value: string) {
  const encrypted = await encryptToken(SECRET, value);
  localStorage.setItem(key, encrypted);
}


async function loadEncrypted(key: string) {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  return decryptToken(SECRET, encrypted);
}


function removeItem(key: string) {
  localStorage.removeItem(key);
}

// ---- Individual setters/loaders ----

// Access Token
export async function storeMatrixToken(token: string) {
  return storeEncrypted("matrix_accessToken", token);
}

export async function loadMatrixToken() {
  return loadEncrypted("matrix_accessToken");
}

export function removeMatrixToken() {
  removeItem("matrix_accessToken");
}

// User ID
export async function storeMatrixUserId(userId: string) {
  return storeEncrypted("matrix_userId", userId);
}

export async function loadMatrixUserId() {
  return loadEncrypted("matrix_userId");
}

export function removeMatrixUserId() {
  removeItem("matrix_userId");
}


export function storeMatrixDeviceId(deviceId: string) {
  localStorage.setItem("matrix_deviceId", deviceId);
}

export function loadMatrixDeviceId() {
  return localStorage.getItem("matrix_deviceId");
}

export function removeMatrixDeviceId() {
  removeItem("matrix_deviceId");
}


export async function storeMatrixRefreshToken(refreshToken: string) {
  return storeEncrypted("matrix_refreshToken", refreshToken);
}

export async function loadMatrixRefreshToken() {
  return loadEncrypted("matrix_refreshToken");
}

export function removeMatrixRefreshToken() {
  removeItem("matrix_refreshToken");
}

export function storeMatrixExpiresIn(ms: number) {
  localStorage.setItem("matrix_expiresIn", String(ms));
}

export function loadMatrixExpiresIn() {
  const val = localStorage.getItem("matrix_expiresIn");
  return val ? Number(val) : null;
}

export function removeMatrixExpiresIn() {
  removeItem("matrix_expiresIn");
}

// Home Server
export function storeMatrixHomeServer(url: string) {
  localStorage.setItem("matrix_homeServer", url);
}

export function loadMatrixHomeServer() {
  return localStorage.getItem("matrix_homeServer");
}

export function removeMatrixHomeServer() {
  removeItem("matrix_homeServer");
}

// Well-known object (stored as JSON string)
export function storeMatrixWellKnown(wellKnown: Record<string, unknown>) {
  localStorage.setItem("matrix_wellKnown", JSON.stringify(wellKnown));
}

export function loadMatrixWellKnown() {
  const json = localStorage.getItem("matrix_wellKnown");
  return json ? JSON.parse(json) : null;
}

export function removeMatrixWellKnown() {
  removeItem("matrix_wellKnown");
}

// ---- Remove all at once ----

export function removeAllMatrixStorage() {
  removeMatrixToken();
  removeMatrixUserId();
  removeMatrixDeviceId();
  removeMatrixRefreshToken();
  removeMatrixExpiresIn();
  removeMatrixHomeServer();
  removeMatrixWellKnown();
}
