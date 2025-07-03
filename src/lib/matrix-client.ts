// lib/matrix-client.ts

export interface MatrixConfig {
  baseUrl: string
  userId: string
  accessToken: string
}

export interface MatrixRoom {
  roomId: string
  name: string
  topic?: string
  memberCount: number
  lastMessage?: string
  lastActivity: Date
  isPublic: boolean
}

export interface MatrixMessage {
  eventId: string
  sender: string
  content: string
  timestamp: Date
  type: string
}

export class EcoFundMeMatrixClient {
  private config: MatrixConfig
  private isInitialized = false
  private rooms: MatrixRoom[] = []
  private messages: Map<string, MatrixMessage[]> = new Map()

  constructor(config: MatrixConfig) {
    this.config = config
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    // Simulate loading rooms, etc.
    this.isInitialized = true
    this.rooms = [
      {
        roomId: "!ocean-cleanup:ecofundme.com",
        name: "Ocean Cleanup Initiative",
        topic: "Cleaning our oceans together",
        memberCount: 1247,
        lastMessage: "Great progress on the Pacific cleanup!",
        lastActivity: new Date(),
        isPublic: true,
      },
      {
        roomId: "!solar-schools:ecofundme.com",
        name: "Solar Schools Project",
        topic: "Bringing renewable energy to education",
        memberCount: 834,
        lastMessage: "Installation complete at Lincoln Elementary",
        lastActivity: new Date(Date.now() - 3600000),
        isPublic: true,
      },
    ]
  }

  async loginWithToken(userId: string, accessToken: string): Promise<void> {
    this.config.userId = userId
    this.config.accessToken = accessToken

    localStorage.setItem("matrix_user_id", userId)
    localStorage.setItem("matrix_access_token", accessToken)

    await this.initialize()
  }

  async logout(): Promise<void> {
    localStorage.removeItem("matrix_access_token")
    localStorage.removeItem("matrix_user_id")
    this.isInitialized = false
    this.rooms = []
    this.messages.clear()
  }

  async sendMessage(roomId: string, message: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized")
    }

    const newMessage: MatrixMessage = {
      eventId: `$${Date.now()}`,
      sender: this.config.userId,
      content: message,
      timestamp: new Date(),
      type: "m.text",
    }

    const roomMessages = this.messages.get(roomId) || []
    roomMessages.push(newMessage)
    this.messages.set(roomId, roomMessages)
  }

  async createRoom(name: string, topic?: string, isPublic = false): Promise<string> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized")
    }

    const roomId = `!${name.toLowerCase().replace(/\s+/g, "-")}:ecofundme.com`

    const newRoom: MatrixRoom = {
      roomId,
      name,
      topic,
      memberCount: 1,
      lastActivity: new Date(),
      isPublic,
    }

    this.rooms.push(newRoom)
    return roomId
  }

  async joinRoom(roomIdOrAlias: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("Matrix client not initialized")
    }

    const room = this.rooms.find((r) => r.roomId === roomIdOrAlias)
    if (room) {
      room.memberCount += 1
    }
  }

  getRooms(): MatrixRoom[] {
    return this.rooms
  }

  getMessages(roomId: string): MatrixMessage[] {
    return this.messages.get(roomId) || []
  }

  getUser() {
    return {
      userId: this.config.userId,
      displayName: this.config.userId?.split(":")[0].substring(1),
    }
  }

  isConnected(): boolean {
    return this.isInitialized
  }

  onRoomTimeline(callback: (message: MatrixMessage, room: MatrixRoom) => void): void {
    // Implement Matrix event listeners in real SDK
  }

  onRoomMember(callback: (event: any, member: any) => void): void {
    // Implement Matrix event listeners in real SDK
  }

  static async autoLogin(): Promise<EcoFundMeMatrixClient | null> {
    const accessToken = localStorage.getItem("matrix_access_token")
    const userId = localStorage.getItem("matrix_user_id")

    if (!accessToken || !userId) {
      return null
    }

    const client = new EcoFundMeMatrixClient({
      baseUrl: "https://chat.ecofundme.com",
      userId,
      accessToken,
    })

    try {
      await client.initialize()
      return client
    } catch (error) {
      console.error("Auto-login failed:", error)
      localStorage.removeItem("matrix_access_token")
      localStorage.removeItem("matrix_user_id")
      return null
    }
  }
}
