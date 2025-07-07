"use client"

import { useState, useEffect, useCallback } from "react"
import { EcoFundMeMatrixClient, MatrixRoom } from "@/lib/matrix-client"

interface MatrixUser {
  userId: string
  displayName: string | undefined
}

interface UseMatrixReturn {
  client: EcoFundMeMatrixClient | null
  isConnected: boolean
  isLoading: boolean
  user: MatrixUser | null
  rooms: MatrixRoom[]
  error: string | null
  register: (data: {
    userId: string
    address: string
    email?: string
    firstName?: string
    lastName?: string
  }) => Promise<void>
  login: (data: { userId: string }) => Promise<void>
  logout: () => Promise<void>
  sendMessage: (roomId: string, message: string) => Promise<void>
  createRoom: (name: string, topic?: string, isPublic?: boolean) => Promise<string>
  joinRoom: (roomIdOrAlias: string) => Promise<void>
}

export function useMatrix(): UseMatrixReturn {
  const [client, setClient] = useState<EcoFundMeMatrixClient | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<MatrixUser | null>(null)
  const [rooms, setRooms] = useState<MatrixRoom[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeClient = async () => {
      try {
        setIsLoading(true)
        const autoClient = await EcoFundMeMatrixClient.autoLogin()

        if (autoClient) {
          setClient(autoClient)
          setIsConnected(true)
          setUser(autoClient.getUser())
          setRooms(autoClient.getRooms())
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize Matrix client")
      } finally {
        setIsLoading(false)
      }
    }

    initializeClient()
  }, [])

  const register = useCallback(
    async (data: {
      userId:string
      // address: string
      email?: string
      firstName?: string
      lastName?: string
    }) => {
      try {
        setIsLoading(true)
        setError(null)

        // Call your own Next.js API
        const res = await fetch("/api/social/register-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!res.ok) {
          const error = await res.text()
          throw new Error(error)
        }

        const {
          matrixUserId,
          matrixAccessToken,
        } = await res.json()

        const newClient = new EcoFundMeMatrixClient({
          baseUrl: "https://chat.ecofundme.com",
          userId: matrixUserId,
          accessToken: matrixAccessToken,
        })

        setClient(newClient)
        setIsConnected(true)
        setUser(newClient.getUser())
        setRooms(newClient.getRooms())
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed")
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  // const login = useCallback(
  //   async (data: { address: string }) => {
  //     try {
  //       setIsLoading(true)
  //       setError(null)

  //       // Call your own Next.js API
  //       const res = await fetch("/api/social/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       })

  //       if (!res.ok) {
  //         const error = await res.text()
  //         throw new Error(error)
  //       }

  //       const {
  //         matrixUserId,
  //         matrixAccessToken,
  //       } = await res.json()

  //       const newClient = new EcoFundMeMatrixClient({
  //         baseUrl: "https://chat.ecofundme.com",
  //         userId: matrixUserId,
  //         accessToken: matrixAccessToken,
  //       })

  //       setClient(newClient)
  //       setIsConnected(true)
  //       setUser(newClient.getUser())
  //       setRooms(newClient.getRooms())
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Login failed")
  //       throw err
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   },
  //   []
  // )

  const login = useCallback(
  async (data: { userId: string }) => {
    try {
      setIsLoading(true)
      setError(null)

      // Call the Next.js API
      const res = await fetch("/api/social/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.text()
        throw new Error(error)
      }

      const {
        success,
        access_token: matrixAccessToken,
        user_id: matrixUserId,
  
      } = await res.json()

      if (!success) {
        throw new Error("Login response indicated failure")
      }

      const newClient = new EcoFundMeMatrixClient({
        baseUrl: "https://chat.ecofundme.com",
        userId: matrixUserId,
        accessToken: matrixAccessToken,
      })

      setClient(newClient)
      setIsConnected(true)
      setUser(newClient.getUser())
      setRooms(newClient.getRooms())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  },
  []
)

  const logout = useCallback(async () => {
    try {
      if (client) {
        await client.logout()
      }
      setClient(null)
      setIsConnected(false)
      setUser(null)
      setRooms([])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed")
    }
  }, [client])

  const sendMessage = useCallback(
    async (roomId: string, message: string) => {
      if (!client) {
        throw new Error("Not connected to Matrix")
      }
      await client.sendMessage(roomId, message)
    },
    [client]
  )

  const createRoom = useCallback(
    async (name: string, topic?: string, isPublic = false) => {
      if (!client) {
        throw new Error("Not connected to Matrix")
      }
      const roomId = await client.createRoom(name, topic, isPublic)
      setRooms(client.getRooms())
      return roomId
    },
    [client]
  )

  const joinRoom = useCallback(
    async (roomIdOrAlias: string) => {
      if (!client) {
        throw new Error("Not connected to Matrix")
      }
      await client.joinRoom(roomIdOrAlias)
      setRooms(client.getRooms())
    },
    [client]
  )

  return {
    client,
    isConnected,
    isLoading,
    user,
    rooms,
    error,
    register,
    login,
    logout,
    sendMessage,
    createRoom,
    joinRoom,
  }
}
