"use server"
import { supabase } from "@/lib/initSupabase"

const DRAWING_ROOM_TABLE = "drawing_rooms"

interface CreateDrawingRoom {
  name: string
  userId: string
  isPublic: boolean
}

export const createRoom = async (data: CreateDrawingRoom) => {
  const { data: room } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .insert({
      name: data.name,
      owner: data.userId,
      isPublic: data.isPublic,
      isPasswordProtected: false,
      password: null,
    })
    .select()

  return room
}

export const getRoomById = async (roomId: string) => {
  const { data: room } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .select()
    .eq("id", roomId)

  return room
}

export const getRoomsByUser = async (userId: string) => {
  const { data: room } = await supabase
    .from(DRAWING_ROOM_TABLE)
    .select()
    .eq("owner", userId)
    .order("created_at", { ascending: false })

  return room
}

export const updateDrawing = async (roomId: string, drawing: object) => {
  await supabase
    .from(DRAWING_ROOM_TABLE)
    .update({ drawing })
    .eq("id", roomId)
    .select()
}
