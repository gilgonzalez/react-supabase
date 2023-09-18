export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jugadores: {
        Row: {
          activo: boolean | null
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}