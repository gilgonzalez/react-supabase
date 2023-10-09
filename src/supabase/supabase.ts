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
          active: boolean | null
          created_at: string
          id: number
          name: string
          picture: string | null
          team_id: number | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          id?: number
          name: string
          picture?: string | null
          team_id?: number | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          id?: number
          name?: string
          picture?: string | null
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jugadores_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          birthday: string
          created_at: string
          id: number
          name: string
        }
        Insert: {
          birthday: string
          created_at?: string
          id?: number
          name?: string
        }
        Update: {
          birthday?: string
          created_at?: string
          id?: number
          name?: string
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
