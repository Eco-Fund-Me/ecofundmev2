// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { EcoFundMeMatrixClient, MatrixRoom } from "@/lib/matrix-client"
// import { removeAllMatrixStorage, storeMatrixToken } from "@/utils/local"
// import { MatrixUser } from "@/lib/matrix-client"

// interface UseMatrixReturn {
//   client: EcoFundMeMatrixClient | null
//   isConnected: boolean
//   isLoading: boolean
//   user: MatrixUser | null
//   rooms: MatrixRoom[]
//   error: string | null
//   register: (data: {
//     userId: string
//     address: string
//     email?: string
//     firstName?: string
//     lastName?: string
//   }) => Promise<void>
//   login: (data: { userId: string }) => Promise<void>
//   logout: () => Promise<void>
//   sendMessage: (roomId: string, message: string) => Promise<void>
//   createRoom: (name: string, topic?: string, isPublic?: boolean) => Promise<string>
//   joinRoom: (roomIdOrAlias: string) => Promise<void>
// }

// export function useMatrix(): UseMatrixReturn {
//   const [client, setClient] = useState<EcoFundMeMatrixClient | null>(null)
//   const [isConnected, setIsConnected] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [user, setUser] = useState<MatrixUser | null>(null)
//   const [rooms, setRooms] = useState<MatrixRoom[]>([])
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const initializeClient = async () => {
//       try {
//         setIsLoading(true)
//         const autoClient = await EcoFundMeMatrixClient.autoLogin()

//         if (autoClient) {
//           setClient(autoClient)
//           setIsConnected(true)
//           setUser(autoClient.getUser())
//           setRooms(autoClient.getRooms())
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to initialize Matrix client")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     initializeClient()
//   }, [])

//   const register = useCallback(
//     async (data: {
//       userId:string
//       // address: string
//       email?: string
//       firstName?: string
//       lastName?: string
//     }) => {
//       try {
//         setIsLoading(true)
//         setError(null)

//         // Call your own Next.js API
//         const res = await fetch("/api/social/register-user", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         })

//         if (!res.ok) {
//           const error = await res.text()
//           throw new Error(error)
//         }

//         const {
//           matrixUserId,
//           matrixAccessToken,
//         } = await res.json()

//         const newClient = new EcoFundMeMatrixClient({
//           baseUrl: "https://chat.ecofundme.com",
//           userId: matrixUserId,
//           accessToken: matrixAccessToken,
//         })

//           await newClient.loginWithToken(matrixUserId, matrixAccessToken);

//         setClient(newClient)
//         setIsConnected(true)
//         setUser((await newClient.getUser()).data)
//         setRooms(newClient.getRooms())
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Registration failed")
//         throw err
//       } finally {
//         setIsLoading(false)
//       }
//     },
//     []
//   )

//   // const login = useCallback(
//   //   async (data: { address: string }) => {
//   //     try {
//   //       setIsLoading(true)
//   //       setError(null)

//   //       // Call your own Next.js API
//   //       const res = await fetch("/api/social/login", {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(data),
//   //       })

//   //       if (!res.ok) {
//   //         const error = await res.text()
//   //         throw new Error(error)
//   //       }

//   //       const {
//   //         matrixUserId,
//   //         matrixAccessToken,
//   //       } = await res.json()

//   //       const newClient = new EcoFundMeMatrixClient({
//   //         baseUrl: "https://chat.ecofundme.com",
//   //         userId: matrixUserId,
//   //         accessToken: matrixAccessToken,
//   //       })

//   //       setClient(newClient)
//   //       setIsConnected(true)
//   //       setUser(newClient.getUser())
//   //       setRooms(newClient.getRooms())
//   //     } catch (err) {
//   //       setError(err instanceof Error ? err.message : "Login failed")
//   //       throw err
//   //     } finally {
//   //       setIsLoading(false)
//   //     }
//   //   },
//   //   []
//   // )

//   const login = useCallback(
//     async (data: { userId: string }) => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         // Call your Next.js API
//         const res = await fetch("/api/social/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });

//         if (!res.ok) {
//           const error = await res.text();
//           throw new Error(error);
//         }

//         const {
//           success,
//           access_token: matrixAccessToken,
//           user_id: matrixUserId,
          
//         } = await res.json();

//         if (!success) {
//           throw new Error("Login response indicated failure");
//         }

//         // Store encrypted token in localStorage
//         await storeMatrixToken(matrixAccessToken);

//         // Create Matrix client
//         const newClient = new EcoFundMeMatrixClient({
//           baseUrl: "https://chat.ecofundme.com",
//           userId: matrixUserId,
//           accessToken: matrixAccessToken,
//         });

//         await newClient.initialize();

//         setClient(newClient);
//         setIsConnected(true);
//         setUser( (await newClient.getUser()).data);
//         setRooms(newClient.getRooms());
//       } catch (err) {
//         console.error("Matrix login error:", err);
//         setError(err instanceof Error ? err.message : "Login failed");
//         throw err;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setIsLoading, setError, setClient, setIsConnected, setUser, setRooms]
//   );




// const logout = useCallback(async () => {
//   try {
//     if (client) {
//       const result = await client.logout();
//       if (!result.success) {
//         console.error(result.message);
//         setError(result.message!);
//       }
//     }

//     setClient(null);
//     setIsConnected(false);
//     setUser(null);
//     setRooms([]);
//     removeAllMatrixStorage();
//   } catch (err) {
//     console.error("Logout error:", err);
//     setError(err instanceof Error ? err.message : "Logout failed");
//   }
// }, [client]);


//   const sendMessage = useCallback(
//     async (roomId: string, message: string) => {
//       if (!client) {
//         throw new Error("Not connected to Matrix")
//       }
//       await client.sendMessage(roomId, message)
//     },
//     [client]
//   )

//   const createRoom = useCallback(
//     async (name: string, topic?: string, isPublic = false) => {
//       if (!client) {
//         throw new Error("Not connected to Matrix")
//       }
//       const roomId = await client.createRoom(name, topic, isPublic)
//       setRooms(client.getRooms())
//       return roomId
//     },
//     [client]
//   )

//   const joinRoom = useCallback(
//     async (roomIdOrAlias: string) => {
//       if (!client) {
//         throw new Error("Not connected to Matrix")
//       }
//       await client.joinRoom(roomIdOrAlias)
//       setRooms(client.getRooms())
//     },
//     [client]
//   )

//   return {
//     client,
//     isConnected,
//     isLoading,
//     user,
//     rooms,
//     error,
//     register,
//     login,
//     logout,
//     sendMessage,
//     createRoom,
//     joinRoom,
//   }
// }


"use client";

import { useState, useEffect, useCallback } from "react";
import {
  EcoFundMeMatrixClient,
  MatrixRoom,
  MatrixSpace,
  MatrixUser,
 
} from "@/lib/matrix-client";
import { removeAllMatrixStorage, storeMatrixToken, storeMatrixUserId } from "@/utils/local";

interface UseMatrixReturn {
  client: EcoFundMeMatrixClient | null;
  isConnected: boolean;
  isLoading: boolean;
  user: MatrixUser | null;
  rooms: MatrixRoom[];
  spaces: MatrixSpace[];
  error: string | null;
  register: (data: {
    userId: string;
    address: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<void>;
  login: (data: { userId: string }) => Promise<void>;
  logout: () => Promise<void>;
  sendMessage: (roomId: string, message: string) => Promise<void>;
  createRoom: (name: string, topic?: string, isPublic?: boolean) => Promise<string>;
  createSpace: (name: string, topic?: string) => Promise<string>;
  createCampaignSpace: (campaignName: string, topic?: string, isPublic?: boolean) => Promise<string>;
  joinRoom: (roomIdOrAlias: string) => Promise<void>;
  joinSpace: (spaceIdOrAlias: string) => Promise<void>;
  joinCampaignSpace: (spaceId: string) => Promise<void>;
    getPublicCampaignSpaces: () => Promise<MatrixSpace[]>;
  getRoomsInSpace: (spaceRoomId: string) => MatrixRoom[];
}

export function useMatrix(): UseMatrixReturn {
  const [client, setClient] = useState<EcoFundMeMatrixClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<MatrixUser | null>(null);
  const [rooms, setRooms] = useState<MatrixRoom[]>([]);
  const [spaces, setSpaces] = useState<MatrixSpace[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        setIsLoading(true);
        const autoClient = await EcoFundMeMatrixClient.autoLogin?.();

        if (autoClient) {
          setClient(autoClient);
          setIsConnected(true);

          const userResult = await autoClient.getUser();
          setUser(userResult.success ? userResult.data! : null);
          setRooms(autoClient.getRooms());
          setSpaces(autoClient.getJoinedSpaces());
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize Matrix client");
      } finally {
        setIsLoading(false);
      }
    };

    initializeClient();
  }, []);

  const register = useCallback(
    async (data: {
      userId: string;
      address: string;
      email?: string;
      firstName?: string;
      lastName?: string;
    }) => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/social/register-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }

        const {
          matrixUserId,
          matrixAccessToken,
        } = await res.json();

        const newClient = new EcoFundMeMatrixClient({
          baseUrl: "https://chat.ecofundme.com",
          userId: matrixUserId,
          accessToken: matrixAccessToken,
        });

        await newClient.initialize();
        await storeMatrixToken(matrixAccessToken);
        await storeMatrixUserId(matrixUserId);


        setClient(newClient);
        setIsConnected(true);
        setUser((await newClient.getUser()).data || null);
        setRooms(newClient.getRooms());
        setSpaces(newClient.getJoinedSpaces());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (data: { userId: string }) => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/social/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }

        const {
          success,
          access_token: matrixAccessToken,
          user_id: matrixUserId,
        } = await res.json();

        if (!success) {
          throw new Error("Login response indicated failure");
        }

        await storeMatrixToken(matrixAccessToken);
        await storeMatrixUserId(matrixUserId);


        const newClient = new EcoFundMeMatrixClient({
          baseUrl: "https://chat.ecofundme.com",
          userId: matrixUserId,
          accessToken: matrixAccessToken,
        });

        await newClient.initialize();

        setClient(newClient);
        setIsConnected(true);
        setUser((await newClient.getUser()).data || null);
        setRooms(newClient.getRooms());
        setSpaces(newClient.getJoinedSpaces());
      } catch (err) {
        console.error("Matrix login error:", err);
        setError(err instanceof Error ? err.message : "Login failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      if (client) {
        const result = await client.logout();
        if (!result.success) {
          setError(result.message!);
          console.error(result.message);
        }
      }

      setClient(null);
      setIsConnected(false);
      setUser(null);
      setRooms([]);
      setSpaces([]);
      removeAllMatrixStorage();
    } catch (err) {
      console.error("Logout error:", err);
      setError(err instanceof Error ? err.message : "Logout failed");
    }
  }, [client]);

  const sendMessage = useCallback(
    async (roomId: string, message: string) => {
      if (!client) throw new Error("Not connected to Matrix");
      await client.sendMessage(roomId, message);
    },
    [client]
  );

  const createRoom = useCallback(
    async (name: string, topic?: string, isPublic = false) => {
      if (!client) throw new Error("Not connected to Matrix");

      const roomId = await client.createRoom(name, topic, isPublic);
      setRooms(client.getRooms());
      return roomId;
    },
    [client]
  );

  const createSpace = useCallback(
    async (name: string, topic?: string) => {
      if (!client) throw new Error("Not connected to Matrix");

      const spaceId = await client.createSpace(name, topic);
      setSpaces(client.getJoinedSpaces());
      return spaceId;
    },
    [client]
  );

const createCampaignSpace: UseMatrixReturn["createCampaignSpace"] = useCallback(
  async (campaignName, topic, isPublic) => {
    if (!client) throw new Error("Not connected to Matrix");

    const result = await client.createCampaignSpace(
      campaignName,
      topic,
      isPublic ?? false
    );

    if (!result.success) throw new Error(result.message || "Failed to create campaign space");

    setSpaces(client.getJoinedSpaces());
    setRooms(client.getRooms());
    return result.data!;
  },
  [client]
);


  const joinRoom = useCallback(
    async (roomIdOrAlias: string) => {
      if (!client) throw new Error("Not connected to Matrix");

      await client.joinRoom(roomIdOrAlias);
      setRooms(client.getRooms());
    },
    [client]
  );

  const joinSpace = useCallback(
    async (spaceIdOrAlias: string) => {
      if (!client) throw new Error("Not connected to Matrix");

      await client.joinSpace(spaceIdOrAlias);
      setSpaces(client.getJoinedSpaces());
    },
    [client]
  );

  const joinCampaignSpace = useCallback(
    async (spaceId: string) => {
      if (!client) throw new Error("Not connected to Matrix");

      await client.joinCampaignSpace(spaceId);
      setRooms(client.getRooms());
      setSpaces(client.getJoinedSpaces());
    },
    [client]
  );

const getPublicCampaignSpaces = useCallback(async () => {
  if (!client || !client.isLoggedIn()) {
    console.warn("Not connected to Matrix.");
    return [];
  }

  try {
    const spaces = await client.getPublicCampaignSpaces();
    console.log("useMatrix → getPublicCampaignSpaces result:", spaces);
    return spaces;
  } catch (e) {
    console.error("useMatrix → Error calling getPublicCampaignSpaces:", e);
    return [];
  }
}, [client]);


const getRoomsInSpace = useCallback(
  (spaceRoomId: string) => {
    // if (!client) throw new Error("Not connected to Matrix");
      if (!client || !client.isLoggedIn()) {
    console.warn("Not connected to Matrix.");
    return [];
  }

    return client.getRoomsInSpace(spaceRoomId);
  },
  [client]
);



  return {
    client,
    isConnected,
    isLoading,
    user,
    rooms,
    spaces,
    error,
    register,
    login,
    logout,
    sendMessage,
    createRoom,
    createSpace,
    createCampaignSpace,
    joinRoom,
    joinSpace,
    joinCampaignSpace,
    getPublicCampaignSpaces,
    getRoomsInSpace 
  };
}

