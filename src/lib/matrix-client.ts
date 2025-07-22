

import { loadMatrixToken, loadMatrixUserId } from "@/utils/local";
import * as sdk from "matrix-js-sdk";
import { MatrixClient, Room, EventTimeline, Visibility, Preset ,HierarchyRoom} from "matrix-js-sdk";
import { MatrixEvent, ReceiptType, RoomMessageEventContent } from "matrix-js-sdk";

// Interface for messages
export interface MatrixMessage {
  eventId: string;
  sender: string;
  content: string;
  timestamp: number;
  type: string;
}



// Callback type for message listener
export type MessageListenerCallback = (roomId: string, message: MatrixMessage) => void;
export type TypingListenerCallback = (roomId: string, userIds: string[]) => void;

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

export interface IRoomHierarchy {
    next_batch?: string;
    rooms: HierarchyRoom[];
}


export interface MatrixRoom {
  roomId: string;
  name?: string;
  topic?: string;
  isSpace: boolean;
  membership?: string;
}

export interface MatrixRoomInfo extends MatrixRoom{
  numJoinedMembers: number;
  canonicalAlias?: string;
}


export interface MatrixSpace extends MatrixRoom {
  children: string[];
}

export interface MatrixOperationResult<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface MatrixMessageContent {
  body: string;
  msgtype: "m.text" | "m.image" | "m.file";
  format?: "org.matrix.custom.html"; // For formatted messages
  formatted_body?: string; // For HTML content
  url?: string; // For media (e.g., images, files)
  info?: {
    // Optional metadata for media
    mimetype?: string;
    size?: number;
  };
}

export interface FallbackMessageEventContent {
  body: string;
  msgtype: string;
  format?: string;
  formatted_body?: string;
  url?: string;
  info?: {
    mimetype?: string;
    size?: number;
  };
}

export class EcoFundMeMatrixClient {
  private readonly baseUrl: string;
  private readonly userId: string;
  private readonly accessToken: string;
  private rooms: MatrixRoom[] = [];
  private spaces: MatrixSpace[] = [];
  private isConnected = false;
  private matrixClient: MatrixClient | null = null;
  private messageListeners: MessageListenerCallback[] = [];
  private typingListeners: TypingListenerCallback[] = [];



  
    constructor(config: MatrixClientConfig) {
      this.baseUrl = config.baseUrl;
      this.userId = config.userId;
      this.accessToken = config.accessToken;
  }

  public static async autoLogin(): Promise<EcoFundMeMatrixClient | null> {
  const token = await loadMatrixToken();
  const userId = await loadMatrixUserId(); // Make sure you store this during login too

  if (!token || !userId) return null;

  const client = new EcoFundMeMatrixClient({
    baseUrl: "https://chat.ecofundme.com",
    userId,
    accessToken: token,
  });

  const result = await client.initialize();
  return result.success ? client : null;
}

private setupEventListeners(): void {
    if (!this.matrixClient) return;

    // Listen for new messages
    this.matrixClient.on("Room.timeline", (event: MatrixEvent, room: Room, toStartOfTimeline: boolean) => {
      if (toStartOfTimeline || event.getType() !== "m.room.message") return;

      const message: MatrixMessage = {
        eventId: event.getId() || "",
        sender: event.getSender() || "",
        content: event.getContent().body || "",
        timestamp: event.getTs(),
        type: event.getContent().msgtype || "m.text",
      };

      this.messageListeners.forEach((callback) => callback(room.roomId, message));
    });

    // Listen for typing events
    this.matrixClient.on("Room.typing", (event: MatrixEvent, room: Room) => {
      const typingUsers = room.getUsersTyping();
      this.typingListeners.forEach((callback) => callback(room.roomId, typingUsers));
    });
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

      // Set up event listeners
      this.setupEventListeners();

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

public async getRoomsInSpace(
  spaceId: string,
  limit = 50,
  suggestedOnly = false
): Promise<MatrixRoomInfo[]> {
  const membership = this.matrixClient!.getRoom(spaceId)?.getMyMembership();
  if (membership !== "join") {
    await this.matrixClient!.joinRoom(spaceId);
  }

  let rooms: MatrixRoomInfo[] = [];
  let fromToken: string | undefined = undefined;

  do {
    const result: IRoomHierarchy =
      await this.matrixClient!.getRoomHierarchy(
        spaceId,
        limit,
        undefined,
        suggestedOnly,
        fromToken
      );

    const batch: MatrixRoomInfo[] = result.rooms.map((child: HierarchyRoom) => {
      const sdkRoom: Room | null =
        this.matrixClient!.getRoom(child.room_id) || null;

      const isSpace = !!(
        sdkRoom?.isSpaceRoom?.() ||
        child.room_type === "m.space"
      );

      return {
        roomId: child.room_id,
        name: child.name,
        topic: child.topic,
        isSpace,
        numJoinedMembers: child.num_joined_members,
        canonicalAlias: child.canonical_alias,
        avatarUrl: child.avatar_url,
        joinRule: child.join_rule,
        worldReadable: child.world_readable,
        guestCanJoin: child.guest_can_join,
      };
    });

    rooms = rooms.concat(batch);
    fromToken = result.next_batch;
  } while (fromToken);

  return rooms;
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
      this.messageListeners = [];
      this.typingListeners = [];

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
  topic?: string,
  type: "campaign" | "general" = "general",
  isPublic: boolean = false
): Promise<string> {
  if (!this.matrixClient) {
    throw new Error("Matrix client not initialized.");
  }

  try {
    const aliasName = type === "campaign" ? `campaign-${name.replace(/\s+/g, '-').toLowerCase()}` : `space-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const response = await this.matrixClient.createRoom({
      name,
      topic,
      creation_content: {
        type: "m.space",
      },
      preset: isPublic ? Preset.PublicChat : Preset.PrivateChat,
      visibility: isPublic ? Visibility.Public : Visibility.Private,
      room_alias_name: isPublic ? aliasName : undefined, // e.g., #campaign-my-campaign
    });

    // Publish to directory if public
    if (isPublic) {
      try {
        await this.matrixClient.setRoomDirectoryVisibility(response.room_id, Visibility.Public);
        console.log(`Room ${response.room_id} published to public directory`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        console.warn(`Failed to publish room ${response.room_id}: ${err.message}`);
        // Continue to allow space creation even if publishing fails
      }
    }

    await this.matrixClient.sendStateEvent(
      response.room_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "eco.social.space.type" as any,
      { type },
      ""
    );

    // Cache space
    const newSpace: MatrixSpace = {
      roomId: response.room_id,
      name,
      topic,
      isSpace: true,
      children: [],
    };

    this.spaces.push(newSpace);

    return response.room_id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("Failed to create space:", error);
    throw new Error(`Failed to create space: ${error.message}`);
  }
}



public async createCampaignSpace(
  campaignName: string,
  campaignTopic?: string,
  isPublic: boolean = false
): Promise<MatrixOperationResult<string>> {
  if (!this.matrixClient) {
    return {
      success: false,
      message: "Matrix client not initialized.",
    };
  }

  try {
    // Step 1: Create the campaign SPACE
    const spaceRoomId = await this.createSpace(
  campaignName,
  campaignTopic,
  "campaign",
  isPublic
);

if (isPublic) {
  await this.matrixClient.sendStateEvent(
    spaceRoomId,
    sdk.EventType.RoomJoinRules,
    { join_rule: sdk.JoinRule.Public },
    ""
  );
}
 await this.matrixClient.sendStateEvent(
  spaceRoomId,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  "eco.social.space.type" as any,
  { type: "campaign" },
  "",
);

    // Step 2: Create the default rooms
    const defaultRooms = [
      { name: "General", topic: `${campaignName} General Chat` },
      { name: "Announcements", topic: `${campaignName} Official Updates` },
      { name: "Onboarding", topic: `${campaignName} Onboarding and Info` }
    ];

    for (const room of defaultRooms) {
      const roomId = await this.createRoom(
        room.name,
        room.topic,
        isPublic

      );

      await this.matrixClient.sendStateEvent(
        spaceRoomId,
        sdk.EventType.SpaceChild,
        
        {
          via: [new URL(this.baseUrl).host],
        },
     
        roomId
      );
    }

    return {
      success: true,
      message: `Campaign space "${campaignName}" created successfully.`,
      data: spaceRoomId,
    };
  } catch (error) {
    console.error("Failed to create campaign space:", error);
    return {
      success: false,
      message: "Failed to create campaign space.",
    };
  }
}




public async getPublicCampaignSpaces(): Promise<MatrixSpace[]> {
  if (!this.matrixClient) {
    console.log("getPublicCampaignSpaces: No Matrix client");
    return [];
  }

  console.log("getPublicCampaignSpaces: Client is ready. UserID:", this.matrixClient.getUserId());

  const result = await this.matrixClient.publicRooms({
    limit: 100,
    include_all_networks: true,
    filter: {
      generic_search_term: "",
    },
  });

  console.log("getPublicCampaignSpaces: publicRooms result:", result);

  const campaignSpaces: MatrixSpace[] = [];

  for (const room of result.chunk) {
    console.log("Checking room:", room);

    if (room.room_type !== "m.space") {
      console.log(`Skipping room ${room.room_id} — not a space`);
      continue;
    }

    try {
      await this.matrixClient.peekInRoom(room.room_id);

      const peekedRoom = this.matrixClient.getRoom(room.room_id);
      console.log(`Peeked room ${room.room_id}:`, peekedRoom);

      if (!peekedRoom) {
        console.warn(`Room ${room.room_id} could not be peeked.`);
        continue;
      }

      const state = peekedRoom.getLiveTimeline().getState(EventTimeline.FORWARDS);

      const event = state?.getStateEvents(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "eco.social.space.type" as any,
        ""
      );

      const spaceType = event?.getContent()?.type;
      console.log(`Room ${room.room_id} has eco.social.space.type =`, spaceType);

      if (spaceType === "campaign") {
        campaignSpaces.push({
          roomId: room.room_id,
          name: room.name,
          topic: room.topic,
          isSpace: true,
          children: [],
        });
      }
    } catch (e) {
      console.warn(`Could not peek into room ${room.room_id}`, e);
      continue;
    }
  }

  console.log("getPublicCampaignSpaces: Returning campaign spaces:", campaignSpaces);
  return campaignSpaces;
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
      children: [],
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

public async joinCampaignSpace(spaceId: string): Promise<void> {
  await this.joinSpace(spaceId);

  const childRooms =await this.getRoomsInSpace(spaceId);
  for (const room of childRooms) {
    if (room.name !== "Donor Chat") {
       await this.joinRoom(room.roomId);
}
  }
}




public async sendMessage(
    roomId: string,
    content: MatrixMessageContent
  ): Promise<MatrixOperationResult<string>> {
    if (!this.matrixClient) {
      return {
        success: false,
        message: "Matrix client not initialized.",
      };
    }

    try {
      // Validate room existence
      const room = this.matrixClient.getRoom(roomId);
      if (!room) {
        return {
          success: false,
          message: `Room ${roomId} not found.`,
        };
      }

      // Ensure user is in the room
      if (!room.hasMembershipState(this.userId, "join")) {
        await this.matrixClient.joinRoom(roomId);
      }

      // Prepare message content
      const messageContent: FallbackMessageEventContent = {
        body: content.body,
        msgtype: content.msgtype,
      };

      // Handle formatted messages (e.g., HTML)
      if (content.format && content.formatted_body) {
        messageContent.format = content.format;
        messageContent.formatted_body = content.formatted_body;
      }

      // Handle media (e.g., images, files)
      if (content.url && content.info) {
        messageContent.url = content.url;
        messageContent.info = content.info;
      }

      // Send the message
      const response = await this.matrixClient.sendMessage(roomId, messageContent);

      return {
        success: true,
        message: "Message sent successfully.",
        data: response.event_id, // Return the event ID of the sent message
      };
    } catch (error) {
      console.error("Send message failed:", error);
      return {
        success: false,
        message: `Failed to send message: ${(error as Error).message}`,
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


public onMessage(callback: MessageListenerCallback): void {
    this.messageListeners.push(callback);
  }

  // Register a callback for typing events
  public onTyping(callback: TypingListenerCallback): void {
    this.typingListeners.push(callback);
  }

  // Send a typing indicator
  public async sendTyping(roomId: string, isTyping: boolean): Promise<MatrixOperationResult> {
    if (!this.matrixClient) {
      return {
        success: false,
        message: "Matrix client not initialized.",
      };
    }

    try {
      await this.matrixClient.sendTyping(roomId, isTyping, 30000); // 30s timeout
      return {
        success: true,
        message: `Typing indicator ${isTyping ? "sent" : "stopped"} successfully.`,
      };
    } catch (error) {
      console.error("Failed to send typing indicator:", error);
      return {
        success: false,
        message: "Failed to send typing indicator.",
      };
    }
  }

  // Send a read receipt for a message
  public async sendReadReceipt(roomId: string, eventId: string): Promise<MatrixOperationResult> {
    if (!this.matrixClient) {
      return {
        success: false,
        message: "Matrix client not initialized.",
      };
    }

    try {
      const room = this.matrixClient.getRoom(roomId);
      if (!room) {
        return {
          success: false,
          message: `Room ${roomId} not found.`,
        };
      }

      const event = room.getLiveTimeline().getEvents().find((e) => e.getId() === eventId);
      if (!event) {
        return {
          success: false,
          message: `Event ${eventId} not found in room ${roomId}.`,
        };
      }

      await this.matrixClient.sendReceipt(event, ReceiptType.Read);
      return {
        success: true,
        message: "Read receipt sent successfully.",
      };
    } catch (error) {
      console.error("Failed to send read receipt:", error);
      return {
        success: false,
        message: "Failed to send read receipt.",
      };
    }
  }

  // Fetch message history for a room
  public async getMessageHistory(
    roomId: string,
    limit: number = 50
  ): Promise<MatrixOperationResult<MatrixMessage[]>> {
    if (!this.matrixClient) {
      return {
        success: false,
        message: "Matrix client not initialized.",
      };
    }

    try {
      const room = this.matrixClient.getRoom(roomId);
      if (!room) {
        return {
          success: false,
          message: `Room ${roomId} not found.`,
        };
      }

      // Ensure timeline is populated
      await this.matrixClient.scrollback(room, limit);

      const messages: MatrixMessage[] = room
        .getLiveTimeline()
        .getEvents()
        .filter((event) => event.getType() === "m.room.message")
        .map((event) => ({
          eventId: event.getId() || "",
          sender: event.getSender() || "",
          content: event.getContent().body || "",
          timestamp: event.getTs(),
          type: event.getContent().msgtype || "m.text",
        }))
        .slice(-limit); // Limit to the most recent messages

      return {
        success: true,
        message: "Message history fetched successfully.",
        data: messages,
      };
    } catch (error) {
      console.error("Failed to fetch message history:", error);
      return {
        success: false,
        message: "Failed to fetch message history.",
      };
    }
  }

  // Clean up listeners on logout






}




/*
https://chat.ecofundme.com/_matrix/client/v3/directory/list/room/!gCjtWMljMrBZrxnKBV%3Aecofundme.com

shows {"visibility":"private"}

[MatrixRTCSessionManager] Got room state event for unknown room !gCjtWMljMrBZrxnKBV:ecofundme.com!
(anonymous) @ 9234-85bcc5db15b36317.js:1Understand this error
chat.ecofundme.com/_matrix/client/v3/directory/list/room/!gCjtWMljMrBZrxnKBV%3Aecofundme.com:1  Failed to load resource: the server responded with a status of 403 (Forbidden)Understand this error
9234-85bcc5db15b36317.js:1 Failed to create space: M_UNKNOWN: MatrixError: [403] Not allowed to publish room (https://chat.ecofundme.com/_matrix/client/v3/directory/list/room/!gCjtWMljMrBZrxnKBV%3Aecofundme.com)
    at S (https://ecofundme-five.vercel.app/_next/static/chunks/84003-84c018719f750644.js:1:297512)
    at https://ecofundme-five.vercel.app/_next/static/chunks/84003-84c018719f750644.js:1:304375
    at Generator.next (<anonymous>)
    at n (https://ecofundme-five.vercel.app/_next/static/chunks/84003-84c018719f750644.js:1:168644)
    at s (https://ecofundme-five.vercel.app/_next/static/chunks/84003-84c018719f750644.js:1:168846)
(anonymous) @ 9234-85bcc5db15b36317.js:1Understand this error
9234-85bcc5db15b36317.js:1 Failed to create campaign space: Error: Failed to create space.
    at f.createSpace (2336-ed32f738ea4f0337.js:1:5579)
    at async f.createCampaignSpace (2336-ed32f738ea4f0337.js:1:5798)
    at async 2336-ed32f738ea4f0337.js:1:12602
    at async C (page-96cfa031894eac4b.js:1:1162)
    at async E (page-96cfa031894eac4b.js:1:1413)
*/