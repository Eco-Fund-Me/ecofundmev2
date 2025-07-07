// import { NextResponse } from "next/server"
// import {db as supabase} from "@/lib/db" // Adjust the import path to your db helper

// export const dynamic = "force-dynamic"

// export async function POST(req: Request) {
//   try {
//     const { address } = await req.json()

//     if (!address) {
//       return NextResponse.json({ error: "Missing wallet address" }, { status: 400 })
//     }

    

//     // Find the user record by wallet address
//     const { data, error } = await supabase
//       .from("users")
//       .select("matrix_user_id, matrix_access_token")
//       .eq("wallet_address", address)
//       .single()

//     if (error || !data) {
//       return NextResponse.json(
//         { error: "User not found or failed to fetch user" },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json({
//       matrixUserId: data.matrix_user_id,
//       matrixAccessToken: data.matrix_access_token,
//     })
//   } catch (error: unknown) {
//     console.error(error)
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Unknown error" },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { db } from '@/lib/db';

// Encryption/Decryption functions
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex'); // Must be set in .env
const ALGORITHM = 'aes-256-gcm';

function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(12); // GCM recommends 12 bytes for IV
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (e) {
    console.error('Encryption error:', e);
    throw new Error('Encryption failed');
  }
}

function decrypt(encryptedData: string): string {
  try {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    console.error('Decryption error:', e);  
    throw new Error('Decryption failed');
  }
}

// Input validation schema
const LoginSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

export async function LOGIN_POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }
    const { userId } = result.data;

    // Get user from database
    const { data: user, error } = await db
      .from('users')
      .select('matrix_user_id, matrix_password, matrix_access_token')
      .eq('user_id', userId)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Try to validate the stored access token if it exists
    if (user.matrix_access_token) {
      try {
        const decryptedAccessToken = decrypt(user.matrix_access_token);
        const whoamiRes = await fetch(
          'https://chat.ecofundme.com/_matrix/client/r0/account/whoami',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${decryptedAccessToken}`,
            },
          }
        );

        if (whoamiRes.ok) {
          // Access token is still valid
          return NextResponse.json({
            success: true,
            access_token: decryptedAccessToken,
            user_id: user.matrix_user_id,
          });
        }
      } catch (e) {
        console.warn('Access token validation failed:', e);
        // Proceed to password login if token is invalid
      }
    }

    // Perform password login
    let decryptedPassword: string;
    try {
      decryptedPassword = decrypt(user.matrix_password);
    } catch (e) {
      console.error('Decryption failed:', e);
      return NextResponse.json(
        { error: 'Failed to decrypt password' },
        { status: 500 }
      );
    }

    const loginRes = await fetch(
      'https://chat.ecofundme.com/_matrix/client/r0/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'm.login.password',
          user: user.matrix_user_id,
          password: decryptedPassword,
        }),
      }
    );

    if (!loginRes.ok) {
      const error = await loginRes.text();
      return NextResponse.json(
        { error: `Login failed: ${error}` },
        { status: 401 }
      );
    }

    const loginData = await loginRes.json();

    // Encrypt and store the new access token
    const encryptedNewAccessToken = encrypt(loginData.access_token);
    const { error: updateError } = await db
      .from('users')
      .update({ matrix_access_token: encryptedNewAccessToken })
      .eq('user_id', userId);

    if (updateError) {
      return NextResponse.json(
        { error: `Failed to update access token: ${updateError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      access_token: loginData.access_token,
      user_id: loginData.user_id,
      device_id: loginData.device_id,
    });

  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}