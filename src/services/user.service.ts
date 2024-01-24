"use server"
import { StreamChat } from "stream-chat"

import { adminAuthClient, supabase } from "@/lib/initSupabase"

export const getUserSession = async () => {
  const { data } = await supabase.auth.getSession()

  return data.session
}

export const getUserById = async (userId: string) => {
  const { data } = await adminAuthClient.getUserById(userId)

  return data
}

export const generateVideoTokenForUser = async (userId: string) => {
  const streamChatApiKey = process.env.STREAM_CHAT_API_KEY ?? ""
  const streamChatApiSecret = process.env.STREAM_CHAT_SECRET_KEY

  // creating an instance of StreamChat
  const streamChat = new StreamChat(streamChatApiKey, streamChatApiSecret)

  // creating a token for the user
  return streamChat.createToken(userId)
}
