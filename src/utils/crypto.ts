

export async function encryptToken(
  secret: string,
  plaintext: string
): Promise<string> {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: iv,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plaintext)
  );

  return `${Buffer.from(iv).toString("base64")}:${Buffer.from(
    new Uint8Array(ciphertext)
  ).toString("base64")}`;
}

export async function decryptToken(
  secret: string,
  encryptedData: string
): Promise<string> {
  const [ivStr, ciphertextStr] = encryptedData.split(":");
  if (!ivStr || !ciphertextStr) {
    throw new Error("Invalid encrypted format");
  }

  const enc = new TextEncoder();

  const iv = Uint8Array.from(Buffer.from(ivStr, "base64"));
  const ciphertext = Uint8Array.from(Buffer.from(ciphertextStr, "base64"));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: iv,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(plaintextBuffer);
}
