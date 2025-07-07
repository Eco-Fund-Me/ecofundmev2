// import { NextResponse } from 'next/server'
// import crypto from 'crypto'
// import { db } from '@/lib/db' // adjust the import path to wherever you put your `db` helper

// interface RegisterUserRequestBody {
//     userId: string
//     walletAddress: string
//     email?: string
//     oauthProvider?: string
//     firstName?: string
//     lastName?: string
// }

// interface MatrixRegisterResponse {
//     user_id: string
//     access_token: string
//     home_server: string
//     device_id: string
// }

// interface SupabaseInsertRow {
//     user_id: string
//     address: string
//     email?: string
//     oauth_provider?: string
//     matrix_user_id: string
//     matrix_password: string
//     first_name?: string
//     last_name?: string
//     created_at: string
// }

// export async function POST(req: Request): Promise<NextResponse> {
//     try {
//         const body: RegisterUserRequestBody = await req.json()

//         const {
//             userId,
//             walletAddress,
//             email,
//             oauthProvider,
//             firstName,
//             lastName,
//         } = body

//         if (!userId || !walletAddress) {
//             return NextResponse.json(
//                 { error: 'Missing userId or walletAddress' },
//                 { status: 400 }
//             )
//         }

//         // STEP 1 → Generate random password
//         const password = crypto.randomBytes(16).toString('hex')

//         // STEP 2 → Get nonce from Synapse
//         const nonceRes: Response = await fetch(
//             'https://chat.ecofundme.com/_synapse/admin/v1/register'
//         )

//         if (!nonceRes.ok) {
//             const err = await nonceRes.text()
//             return NextResponse.json(
//                 { error: `Failed to get nonce: ${err}` },
//                 { status: 500 }
//             )
//         }

//         const { nonce }: { nonce: string } = await nonceRes.json()

//         // STEP 3 → Build MAC signature
//         const sharedSecret = process.env.SYNAPSE_SECRET
//         if (!sharedSecret) {
//             return NextResponse.json(
//                 { error: 'SYNAPSE_SECRET environment variable is not set' },
//                 { status: 500 }
//             )
//         }

//         const adminFlag = 'notadmin'

//         const macString = `${nonce}\0${walletAddress}\0${password}\0${adminFlag}`

//         const mac = crypto
//             .createHmac('sha1', sharedSecret)
//             .update(macString)
//             .digest('hex')

//         // STEP 4 → Register user in Synapse
//         const registerRes: Response = await fetch(
//             'https://chat.ecofundme.com/_synapse/admin/v1/register',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     nonce,
//                     username: walletAddress,
//                     password,
//                     admin: false,
//                     mac,
//                     displayname: `${firstName || ''} ${lastName || ''}`.trim(),
//                 }),
//             }
//         )

//         if (!registerRes.ok) {
//             const error = await registerRes.text()
//             return NextResponse.json(
//                 { error: `Matrix registration failed: ${error}` },
//                 { status: 500 }
//             )
//         }

//         const matrixData: MatrixRegisterResponse = await registerRes.json()

//         // STEP 5 → Save to Supabase
//         const { error }: { error: { message: string } | null } = await db
//             .from('users')
//             .insert([
//                 {
//                     user_id: userId,
//                     address: walletAddress,
//                     email,
//                     oauth_provider: oauthProvider,
//                     matrix_user_id: matrixData.user_id,
//                     matrix_password: password,
//                     first_name: firstName,
//                     last_name: lastName,
//                     created_at: new Date().toISOString(),
//                 } as SupabaseInsertRow,
//             ])

//         if (error) {
//             return NextResponse.json({ error: error.message }, { status: 500 })
//         }

//         return NextResponse.json({
//             success: true,
//             matrix_user_id: matrixData.user_id,
//             access_token: matrixData.access_token,
//             home_server: matrixData.home_server,
//             device_id: matrixData.device_id,
//         })
//     } catch (e) {
//         console.error(e)
//         const errorMessage = e instanceof Error ? e.message : String(e)
//         return NextResponse.json({ error: errorMessage }, { status: 500 })
//     }
// }

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { db } from '@/lib/db';

// Encryption function
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

// Input validation schema
const RegisterSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  email: z.string().email('Invalid email').optional(),
  oauthProvider: z.string().max(50, 'OAuth provider too long').optional(),
  firstName: z.string().max(50, 'First name too long').optional(),
  lastName: z.string().max(50, 'Last name too long').optional(),
});

interface RegisterUserRequestBody {
  userId: string;
  email?: string;
  oauthProvider?: string;
  firstName?: string;
  lastName?: string;
}

interface MatrixRegisterResponse {
  user_id: string;
  access_token: string;
  home_server: string;
  device_id: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse and validate request body
    const body: RegisterUserRequestBody = await req.json();
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }
    const { userId, email, oauthProvider, firstName, lastName } = result.data;

    // Generate a random wallet address
    const walletAddress = '0x' + crypto.randomBytes(20).toString('hex');

    // Generate random password
    const password = crypto.randomBytes(16).toString('hex');

    // Get nonce from Synapse
    const nonceRes = await fetch('https://chat.ecofundme.com/_synapse/admin/v1/register');
    if (!nonceRes.ok) {
      const err = await nonceRes.text();
      return NextResponse.json(
        { error: `Failed to get nonce: ${err}` },
        { status: 500 }
      );
    }
    const { nonce }: { nonce: string } = await nonceRes.json();

    // Create MAC signature
    const sharedSecret = process.env.MATRIX_SHARED_SECRET;
    if (!sharedSecret) {
      return NextResponse.json(
        { error: 'SYNAPSE_SECRET or MATRIX_SHARED_SECRET environment variable is not set' },
        { status: 500 }
      );
    }

    const macString = `${nonce}\0${walletAddress}\0${password}\0notadmin`;
    const mac = crypto
      .createHmac('sha1', sharedSecret)
      .update(macString)
      .digest('hex');

    // Register user in Synapse
    const registerRes = await fetch(
      'https://chat.ecofundme.com/_synapse/admin/v1/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nonce,
          username: walletAddress,
          password,
          admin: false,
          mac, // Ensure mac is used in the payload
          displayname: `${firstName || ''} ${lastName || ''}`.trim(),
        }),
      }
    );

    if (!registerRes.ok) {
      const error = await registerRes.text();
      return NextResponse.json(
        { error: `Matrix registration failed: ${error}` },
        { status: 500 }
      );
    }

    const matrixData: MatrixRegisterResponse = await registerRes.json();

    // Encrypt password and access token before storing
    const encryptedPassword = encrypt(password);
    const encryptedAccessToken = encrypt(matrixData.access_token);

    // Store user in database
    const { error } = await db
      .from('users')
      .insert([
        {
          user_id: userId,
          address: walletAddress,
          email,
          oauth_provider: oauthProvider,
          matrix_user_id: matrixData.user_id,
          matrix_password: encryptedPassword,
          matrix_access_token: encryptedAccessToken,
          first_name: firstName,
          last_name: lastName,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      matrix_user_id: matrixData.user_id,
      matrix_access_token: matrixData.access_token,
      home_server: matrixData.home_server,
      device_id: matrixData.device_id,
      wallet_address: walletAddress,
    });

  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}