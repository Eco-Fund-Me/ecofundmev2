"use server";

import { db as supabase } from "@/lib/db";

// Types

export interface Social {
  user_id: string;
  dms: string[];
  joined_campaigns: string[];
  joined_spaces: Record<string, string[]>;
  followers: string[];
  following: string[];
  blocked_users: string[];
  profile_bio?: string;
  profile_avatar_url?: string;
  last_active_at?: string;
  notifications_settings?: Record<string, unknown>;
  custom_metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateSocialParams {
  user_id: string;
  dms?: string[];
  joined_campaigns?: string[];
  joined_spaces?: Record<string, string[]>;
  followers?: string[];
  following?: string[];
  blocked_users?: string[];
  profile_bio?: string;
  profile_avatar_url?: string;
  last_active_at?: string;
  notifications_settings?: Record<string, unknown>;
  custom_metadata?: Record<string, unknown>;
}

// --- Core CRUD

export async function addSocialRecord(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("social")
      .insert({
        user_id,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating social record:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Social };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Unexpected error creating social record" };
  }
}

export async function getSocialByUserId(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("social")
      .select("*")
      .eq("user_id", user_id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching social record:", error);
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: "Social record not found" };
    }

    return { success: true, data: data as Social };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Unexpected error fetching social record" };
  }
}

export async function updateSocial(params: UpdateSocialParams) {
  try {
    const { user_id, ...updates } = params;

    const { data, error } = await supabase
      .from("social")
      .update(updates)
      .eq("user_id", user_id)
      .select()
      .single();

    if (error) {
      console.error("Error updating social record:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Social };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Unexpected error updating social record" };
  }
}

// --- Social Features

export async function addDM(user_id: string, newDmId: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  if (data.dms.includes(newDmId)) {
    return { success: true, data };
  }

  const updated = await updateSocial({
    user_id,
    dms: [...data.dms, newDmId],
  });

  return updated;
}

export async function removeDM(user_id: string, dmId: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  const updatedDms = data.dms.filter((id) => id !== dmId);

  const updated = await updateSocial({
    user_id,
    dms: updatedDms,
  });

  return updated;
}

export async function joinCampaign(user_id: string, campaignId: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  if (data.joined_campaigns.includes(campaignId)) {
    return { success: true, data };
  }

  const updated = await updateSocial({
    user_id,
    joined_campaigns: [...data.joined_campaigns, campaignId],
  });

  return updated;
}

export async function leaveCampaign(user_id: string, campaignId: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  const updatedCampaigns = data.joined_campaigns.filter((id) => id !== campaignId);

  const updated = await updateSocial({
    user_id,
    joined_campaigns: updatedCampaigns,
  });

  return updated;
}

export async function joinSpace(
  user_id: string,
  campaignId: string,
  roomId: string
) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  const joinedSpaces = { ...data.joined_spaces };

  if (!joinedSpaces[campaignId]) {
    joinedSpaces[campaignId] = [];
  }

  if (!joinedSpaces[campaignId].includes(roomId)) {
    joinedSpaces[campaignId].push(roomId);
  }

  const updated = await updateSocial({
    user_id,
    joined_spaces: joinedSpaces,
  });

  return updated;
}

export async function leaveSpace(
  user_id: string,
  campaignId: string,
  roomId: string
) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  const joinedSpaces = { ...data.joined_spaces };

  if (joinedSpaces[campaignId]) {
    joinedSpaces[campaignId] = joinedSpaces[campaignId].filter(
      (id) => id !== roomId
    );
    if (joinedSpaces[campaignId].length === 0) {
      delete joinedSpaces[campaignId];
    }
  }

  const updated = await updateSocial({
    user_id,
    joined_spaces: joinedSpaces,
  });

  return updated;
}

export async function followUser(user_id: string, target_user_id: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  if (data.following.includes(target_user_id)) {
    return { success: true, data };
  }

  const updated = await updateSocial({
    user_id,
    following: [...data.following, target_user_id],
  });

  return updated;
}

export async function unfollowUser(user_id: string, target_user_id: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  const updatedFollowing = data.following.filter(
    (id) => id !== target_user_id
  );

  const updated = await updateSocial({
    user_id,
    following: updatedFollowing,
  });

  return updated;
}

export async function blockUser(user_id: string, target_user_id: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  if (data.blocked_users.includes(target_user_id)) {
    return { success: true, data };
  }

  const updated = await updateSocial({
    user_id,
    blocked_users: [...data.blocked_users, target_user_id],
  });

  return updated;
}

export async function unblockUser(user_id: string, target_user_id: string) {
  const { success, data, error } = await getSocialByUserId(user_id);
  if (!success || !data) return { success: false, error };

  const updatedBlocked = data.blocked_users.filter(
    (id) => id !== target_user_id
  );

  const updated = await updateSocial({
    user_id,
    blocked_users: updatedBlocked,
  });

  return updated;
}
