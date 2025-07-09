
// export interface MatrixConfig {
//   baseUrl: string
//   userId: string
//   accessToken: string
// }

// export interface MatrixRoom {
//   roomId: string
//   name: string
//   topic?: string
//   memberCount: number
//   lastMessage?: string
//   lastActivity: Date
//   isPublic: boolean
// }

// export interface MatrixMessage {
//   eventId: string
//   sender: string
//   content: string
//   timestamp: Date
//   type: string
// }

// export class EcoFundMeMatrixClient {
//   private config: MatrixConfig
//   private isInitialized = false
//   private rooms: MatrixRoom[] = []
//   private messages: Map<string, MatrixMessage[]> = new Map()

//   constructor(config: MatrixConfig) {
//     this.config = config
//   }

//   async initialize(): Promise<void> {
//     if (this.isInitialized) return

//     // Simulate loading rooms, etc.
//     this.isInitialized = true
//     this.rooms = [
//       {
//         roomId: "!ocean-cleanup:ecofundme.com",
//         name: "Ocean Cleanup Initiative",
//         topic: "Cleaning our oceans together",
//         memberCount: 1247,
//         lastMessage: "Great progress on the Pacific cleanup!",
//         lastActivity: new Date(),
//         isPublic: true,
//       },
//       {
//         roomId: "!solar-schools:ecofundme.com",
//         name: "Solar Schools Project",
//         topic: "Bringing renewable energy to education",
//         memberCount: 834,
//         lastMessage: "Installation complete at Lincoln Elementary",
//         lastActivity: new Date(Date.now() - 3600000),
//         isPublic: true,
//       },
//     ]
//   }

//   async loginWithToken(userId: string, accessToken: string): Promise<void> {
//     this.config.userId = userId
//     this.config.accessToken = accessToken

//     localStorage.setItem("matrix_user_id", userId)
//     localStorage.setItem("matrix_access_token", accessToken)

//     await this.initialize()
//   }

//   async logout(): Promise<void> {
//     localStorage.removeItem("matrix_access_token")
//     localStorage.removeItem("matrix_user_id")
//     this.isInitialized = false
//     this.rooms = []
//     this.messages.clear()
//   }

//   async sendMessage(roomId: string, message: string): Promise<void> {
//     if (!this.isInitialized) {
//       throw new Error("Matrix client not initialized")
//     }

//     const newMessage: MatrixMessage = {
//       eventId: `$${Date.now()}`,
//       sender: this.config.userId,
//       content: message,
//       timestamp: new Date(),
//       type: "m.text",
//     }

//     const roomMessages = this.messages.get(roomId) || []
//     roomMessages.push(newMessage)
//     this.messages.set(roomId, roomMessages)
//   }

//   async createRoom(name: string, topic?: string, isPublic = false): Promise<string> {
//     if (!this.isInitialized) {
//       throw new Error("Matrix client not initialized")
//     }

//     const roomId = `!${name.toLowerCase().replace(/\s+/g, "-")}:ecofundme.com`

//     const newRoom: MatrixRoom = {
//       roomId,
//       name,
//       topic,
//       memberCount: 1,
//       lastActivity: new Date(),
//       isPublic,
//     }

//     this.rooms.push(newRoom)
//     return roomId
//   }

//   async joinRoom(roomIdOrAlias: string): Promise<void> {
//     if (!this.isInitialized) {
//       throw new Error("Matrix client not initialized")
//     }

//     const room = this.rooms.find((r) => r.roomId === roomIdOrAlias)
//     if (room) {
//       room.memberCount += 1
//     }
//   }

//   getRooms(): MatrixRoom[] {
//     return this.rooms
//   }

//   getMessages(roomId: string): MatrixMessage[] {
//     return this.messages.get(roomId) || []
//   }

//   getUser() {
//     return {
//       userId: this.config.userId,
//       displayName: this.config.userId?.split(":")[0].substring(1),
//     }
//   }

//   isConnected(): boolean {
//     return this.isInitialized
//   }

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   onRoomTimeline(_callback: (message: MatrixMessage, room: MatrixRoom) => void): void {
//     // Implement Matrix event. listeners in real SDK
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
//   onRoomMember(_: (event: any, member: any) => void): void {
//     // Implement Matrix event listeners in real SDK
//   }

//   static async autoLogin(): Promise<EcoFundMeMatrixClient | null> {
//     const accessToken = localStorage.getItem("matrix_access_token")
//     const userId = localStorage.getItem("matrix_user_id")

//     if (!accessToken || !userId) {
//       return null
//     }

//     const client = new EcoFundMeMatrixClient({
//       baseUrl: "https://chat.ecofundme.com",
//       userId,
//       accessToken,
//     })

//     try {
//       await client.initialize()
//       return client
//     } catch (error) {
//       console.error("Auto-login failed:", error)
//       localStorage.removeItem("matrix_access_token")
//       localStorage.removeItem("matrix_user_id")
//       return null
//     }
//   }
// }

import * as sdk from "matrix-js-sdk";
import { MatrixClient, Room, EventTimeline, Visibility, Preset } from "matrix-js-sdk";

export interface MatrixClientConfig {
  baseUrl: string;
  userId: string;
  accessToken: string;
}

export interface MatrixUser {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface MatrixRoom {
  roomId: string;
  name?: string;
  topic?: string;
  isSpace: boolean;
  membership?: string;
}



export interface MatrixSpace extends MatrixRoom {
  children: string[];
}

export interface MatrixOperationResult<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
}


export class EcoFundMeMatrixClient {
  private readonly baseUrl: string;
  private readonly userId: string;
  private readonly accessToken: string;
  private rooms: MatrixRoom[] = [];
  private spaces: MatrixSpace[] = [];
  private isConnected = false;
  private matrixClient: MatrixClient | null = null;



  
    constructor(config: MatrixClientConfig) {
      this.baseUrl = config.baseUrl;
      this.userId = config.userId;
      this.accessToken = config.accessToken;
  }



public getUserId(): string {
  return this.userId;
}


public getBaseUrl(): string {
  return this.baseUrl;
}

public async getUser(): Promise<MatrixOperationResult<MatrixUser>> {
  if (!this.matrixClient) {
    return {
      success: false,
      message: "Matrix client not initialized.",
    };
  }

  try {
    const profile = await this.matrixClient.getProfileInfo(this.userId);
    return {
      success: true,
      message: "User profile fetched successfully.",
      data: {
        userId: this.userId,
        displayName: profile.displayname,
        avatarUrl: profile.avatar_url,
      },
    };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return {
      success: false,
      message: "Failed to fetch user profile.",
    };
  }
}

isSpaceRoom(room: Room): boolean {
  return room.getType() === "m.space";
}

 getRoomTopic(room: Room): string | undefined {
  const topicEvent = room
    .getLiveTimeline()
    .getState(EventTimeline.FORWARDS)
    ?.getStateEvents("m.room.topic", "");

  return topicEvent?.getContent()?.topic;
}



public getJoinedSpaces(): MatrixSpace[] {
  if (!this.matrixClient) return [];

  return this.matrixClient
    .getRooms()
    .filter((room) => this.isSpaceRoom(room) && room.hasMembershipState(this.userId, "join"))
    .map((room) => ({
      roomId: room.roomId,
      name: room.name || room.getCanonicalAlias() || undefined,
      topic: this.getRoomTopic(room),
      isSpace: true,
      children: [], 
    }));
}


public getRoomsInSpace(spaceRoomId: string): MatrixRoom[] {
  if (!this.matrixClient) return [];

  const spaceRoom = this.matrixClient.getRoom(spaceRoomId);
   
  if (!spaceRoom) return [];

  const state = spaceRoom
    .getLiveTimeline()
    .getState(EventTimeline.FORWARDS);

  const childEvents = state?.getStateEvents("m.space.child") || [];

  const childRoomIds = childEvents.map(e => e.getStateKey());

  const rooms = childRoomIds
    .map(roomId => this.matrixClient!.getRoom(roomId))
    .filter((room): room is Room => !!room);

  return rooms.map(room => ({
    roomId: room.roomId,
    name: room.name || room.getCanonicalAlias() || undefined,
    topic: this.getRoomTopic(room),
    isSpace: room.getType() === "m.space",
  }));
}

public async getPublicSpaces(): Promise<MatrixSpace[]> {
  if (!this.matrixClient) {
    return [];
  }

  const result = await this.matrixClient.publicRooms({
    limit: 100,
    include_all_networks: true,
    filter: {
      generic_search_term: "", 
    },
  });

  const spaces = result.chunk
    .filter(room => room.room_type === "m.space")
    .map(room => ({
      roomId: room.room_id,
      name: room.name,
      topic: room.topic,
      isSpace: true,
      children: [],
    }));

  return spaces;
}


public getRooms(): MatrixRoom[] {
  return this.rooms;
}

public isLoggedIn(): boolean {
  return this.isConnected;
}

public async initialize(): Promise<MatrixOperationResult> {
  this.matrixClient = sdk.createClient({
    baseUrl: this.baseUrl,
    accessToken: this.accessToken,
    userId: this.userId,
  });

  try {
    const whoami = await this.matrixClient.whoami();
    console.log("Logged in as", whoami.user_id);

    await this.matrixClient.startClient();
    this.isConnected = true;

    return {
      success: true,
      message: "Matrix client initialized successfully.",
    };
  } catch (error) {
    console.error("Matrix client initialization failed", error);

    return {
      success: false,
      message: "Matrix client initialization failed.",
    };
  }
}





public async logout(): Promise<MatrixOperationResult> {
  if (!this.matrixClient) {
    return {
      success: false,
      message: "Matrix client not initialized.",
    };
  }

  try {
    await this.matrixClient.logout(); 
    await this.matrixClient.stopClient();
    this.isConnected = false;
    this.matrixClient = null;
    this.rooms = [];
    this.spaces = [];

    return {
      success: true,
      message: "Logged out successfully.",
    };
  } catch (error) {
    console.error("Logout failed", error);
    return {
      success: false,
      message: "Logout failed.",
    };
  }
}

public async createRoom(
  name: string,
  topic?: string,
  isPublic: boolean = false
): Promise<string> {
  if (!this.matrixClient) {
    throw new Error("Matrix client not initialized.");
  }

  const isvisible: Visibility = isPublic ? Visibility.Public : Visibility.Private;

  try {
    const response = await this.matrixClient.createRoom({
      name,
      topic,
      visibility: isvisible,
    });

    // Update cached rooms if you wish
    const newRoom: MatrixRoom = {
      roomId: response.room_id,
      name,
      topic,
      isSpace: false,
    };

    this.rooms.push(newRoom);

    return response.room_id;
  } catch (error) {
    console.error("Failed to create room:", error);
    throw new Error("Failed to create room.");
  }
}

public async createSpace(
  name: string,
  topic?: string
): Promise<string> {
  if (!this.matrixClient) {
    throw new Error("Matrix client not initialized.");
  }

  try {
    const response = await this.matrixClient.createRoom({
      name,
      topic,
      creation_content: {
        type: "m.space",
      },
      preset: Preset.PrivateChat, // or public if you want it public
      visibility: Visibility.Private,
    });

    // Optionally cache the new space:
    const newSpace: MatrixSpace = {
      roomId: response.room_id,
      name,
      topic,
      isSpace: true,
      children: [],
    };

    this.spaces.push(newSpace);

    return response.room_id;
  } catch (error) {
    console.error("Failed to create space:", error);
    throw new Error("Failed to create space.");
  }
}

public async joinRoom(roomIdOrAlias: string): Promise<MatrixOperationResult<MatrixRoom>> {
  if (!this.matrixClient) {
    return {
      success: false,
      message: "Matrix client not initialized.",
    };
  }

  try {
    const joinedRoom = await this.matrixClient.joinRoom(roomIdOrAlias);

    // Optional: update cached rooms list
    const newRoom: MatrixRoom = {
      roomId: joinedRoom.roomId,
      name: joinedRoom.name || joinedRoom.getCanonicalAlias() || undefined,
      topic: this.getRoomTopic(joinedRoom),
      isSpace: this.isSpaceRoom(joinedRoom),
    };

    this.rooms.push(newRoom);

    return {
      success: true,
      message: `Joined room ${roomIdOrAlias} successfully.`,
      data: newRoom,
    };
  } catch (error) {
    console.error("Join room failed:", error);
    return {
      success: false,
      message: `Failed to join room: ${roomIdOrAlias}`,
    };
  }
}

public async joinSpace(spaceIdOrAlias: string): Promise<MatrixOperationResult<MatrixSpace>> {
  if (!this.matrixClient) {
    return {
      success: false,
      message: "Matrix client not initialized.",
    };
  }

  try {
    const joinedSpace = await this.matrixClient.joinRoom(spaceIdOrAlias);

    const newSpace: MatrixSpace = {
      roomId: joinedSpace.roomId,
      name: joinedSpace.name || joinedSpace.getCanonicalAlias() || undefined,
      topic: this.getRoomTopic(joinedSpace),
      isSpace: true,
      children: [], // will fill later when you fetch children
    };

    this.spaces.push(newSpace);

    return {
      success: true,
      message: `Joined space ${spaceIdOrAlias} successfully.`,
      data: newSpace,
    };
  } catch (error) {
    console.error("Join space failed:", error);
    return {
      success: false,
      message: `Failed to join space: ${spaceIdOrAlias}`,
    };
  }
}


public async sendMessage(roomId: string, message: string): Promise<MatrixOperationResult> {
  if (!this.matrixClient) {
    return {
      success: false,
      message: "Matrix client not initialized.",
    };
  }

  try {
    await this.matrixClient.sendTextMessage(roomId, message);
    return {
      success: true,
      message: "Message sent successfully.",
    };
  } catch (error) {
    console.error("Send message failed:", error);
    return {
      success: false,
      message: "Failed to send message.",
    };
  }
}

public async createDm(
  targetUserId: string,
  name?: string,
  topic?: string
): Promise<MatrixOperationResult<string>> {
  if (!this.matrixClient) {
    return {
      success: false,
      message: "Matrix client not initialized.",
    };
  }

  try {
    const response = await this.matrixClient.createRoom({
      name,
      topic,
      preset: Preset.TrustedPrivateChat,
      is_direct: true,
      invite: [targetUserId],
      visibility: Visibility.Private,
    });

    const newDm: MatrixRoom = {
      roomId: response.room_id,
      name,
      topic,
      isSpace: false,
    };

    this.rooms.push(newDm);

    return {
      success: true,
      message: `DM room created with ${targetUserId}.`,
      data: response.room_id,
    };
  } catch (error) {
    console.error("Failed to create DM:", error);
    return {
      success: false,
      message: "Failed to create DM.",
    };
  }
}






}
