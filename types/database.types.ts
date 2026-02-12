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
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['organizations']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['organizations']['Insert']>
      }
      users: {
        Row: {
          id: string
          organization_id: string | null
          email: string
          full_name: string | null
          role: 'admin' | 'editor' | 'viewer'
          avatar_url: string | null
          last_seen_at: string | null
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'> & {
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      districts: {
        Row: {
          id: string
          organization_id: string | null
          code: string
          name: string
          state: string
          metadata: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['districts']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['districts']['Insert']>
      }
      zip_codes: {
        Row: {
          id: string
          zip: string
          district_id: string | null
          city: string | null
          state: string | null
          latitude: number | null
          longitude: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['zip_codes']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['zip_codes']['Insert']>
      }
      campaigns: {
        Row: {
          id: string
          organization_id: string
          name: string
          slug: string
          status: 'draft' | 'pending' | 'active' | 'paused' | 'completed' | 'archived'
          objective: 'online_survey' | 'focus_group'
          survey_url: string | null
          desired_completes: number
          start_date: string | null
          end_date: string | null
          incentive_amount: number
          incentive_method: 'gift_card' | 'paypal' | 'manual'
          completion_definition: 'webhook' | 'manual'
          meta_ads_enabled: boolean
          google_ads_enabled: boolean
          meta_daily_budget: number | null
          google_daily_budget: number | null
          utm_source: string
          utm_medium: string
          utm_campaign: string | null
          meta_headline: string | null
          meta_body: string | null
          google_headlines: Json
          google_descriptions: Json
          overfill_handling: 'stop' | 'allow_10' | 'redirect'
          consent_text: string | null
          privacy_policy_url: string | null
          contact_email: string | null
          settings: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['campaigns']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['campaigns']['Insert']>
      }
      campaign_districts: {
        Row: {
          id: string
          campaign_id: string
          district_id: string
          target_completes: number
          daily_budget: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['campaign_districts']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['campaign_districts']['Insert']>
      }
      screener_questions: {
        Row: {
          id: string
          campaign_id: string
          question_text: string
          question_type: 'single_choice' | 'multi_choice' | 'text' | 'zip_code' | 'number' | 'scale'
          options: Json
          validation_rules: Json
          error_message: string | null
          is_required: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['screener_questions']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['screener_questions']['Insert']>
      }
      consent_versions: {
        Row: {
          id: string
          campaign_id: string
          version: string
          consent_text: string
          acknowledgments: Json
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['consent_versions']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['consent_versions']['Insert']>
      }
      respondents: {
        Row: {
          id: string
          campaign_id: string
          session_id: string | null
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          zip_code: string | null
          zip_code_id: string | null
          district_id: string | null
          external_id: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_content: string | null
          channel: string | null
          search_query: string | null
          status: 'landed' | 'consented' | 'screener_started' | 'screener_passed' | 'screener_failed' | 'survey_started' | 'survey_completed' | 'payout_pending' | 'payout_sent' | 'payout_failed'
          screener_responses: Json
          is_qualified: boolean | null
          consent_version_id: string | null
          consented_at: string | null
          survey_started_at: string | null
          survey_completed_at: string | null
          survey_responses: Json
          quality_score: number | null
          payout_amount: number | null
          payout_method: string | null
          payout_email: string | null
          payout_sent_at: string | null
          payout_error: string | null
          user_agent: string | null
          ip_address: string | null
          device_type: string | null
          browser: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['respondents']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['respondents']['Insert']>
      }
      respondent_activity_log: {
        Row: {
          id: string
          respondent_id: string
          event_type: string
          event_data: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['respondent_activity_log']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['respondent_activity_log']['Insert']>
      }
      quota_tracking: {
        Row: {
          id: string
          campaign_id: string
          district_id: string | null
          zip_code_id: string | null
          target: number
          filled: number
          pause_at: number | null
          is_paused: boolean
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['quota_tracking']['Row'], 'id' | 'updated_at'> & {
          id?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['quota_tracking']['Insert']>
      }
      payouts: {
        Row: {
          id: string
          respondent_id: string
          campaign_id: string
          amount: number
          method: string
          recipient_email: string
          status: 'pending' | 'processing' | 'sent' | 'failed' | 'cancelled'
          provider: string | null
          provider_order_id: string | null
          provider_response: Json
          processed_at: string | null
          sent_at: string | null
          error_message: string | null
          processed_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['payouts']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['payouts']['Insert']>
      }
      gift_card_settings: {
        Row: {
          id: string
          organization_id: string
          provider: 'tremendous' | 'cardivo'
          cardivo_api_key_encrypted: string | null
          tremendous_api_key_encrypted: string | null
          default_product_id: string | null
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['gift_card_settings']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['gift_card_settings']['Insert']>
      }
      ad_connections: {
        Row: {
          id: string
          organization_id: string
          platform: 'meta' | 'google'
          account_id: string | null
          account_name: string | null
          access_token_encrypted: string | null
          refresh_token_encrypted: string | null
          token_expires_at: string | null
          is_connected: boolean
          last_synced_at: string | null
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['ad_connections']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['ad_connections']['Insert']>
      }
      campaign_events: {
        Row: {
          id: string
          campaign_id: string
          event_type: string
          event_data: Json
          district_id: string | null
          channel: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['campaign_events']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['campaign_events']['Insert']>
      }
    }
  }
}

// Convenience types
export type Organization = Database['public']['Tables']['organizations']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type District = Database['public']['Tables']['districts']['Row']
export type ZipCode = Database['public']['Tables']['zip_codes']['Row']
export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type CampaignDistrict = Database['public']['Tables']['campaign_districts']['Row']
export type ScreenerQuestion = Database['public']['Tables']['screener_questions']['Row']
export type ConsentVersion = Database['public']['Tables']['consent_versions']['Row']
export type Respondent = Database['public']['Tables']['respondents']['Row']
export type RespondentActivityLog = Database['public']['Tables']['respondent_activity_log']['Row']
export type QuotaTracking = Database['public']['Tables']['quota_tracking']['Row']
export type Payout = Database['public']['Tables']['payouts']['Row']
export type GiftCardSettings = Database['public']['Tables']['gift_card_settings']['Row']
export type AdConnection = Database['public']['Tables']['ad_connections']['Row']
export type CampaignEvent = Database['public']['Tables']['campaign_events']['Row']

// Extended types with relations
export interface CampaignWithDistricts extends Campaign {
  campaign_districts: (CampaignDistrict & {
    districts: District
  })[]
}

export interface CampaignWithStats extends Campaign {
  stats: {
    totalCompletes: number
    totalSpend: number
    cpi: number
    qualRate: number
  }
}

export interface RespondentWithActivity extends Respondent {
  activities: RespondentActivityLog[]
  district?: District | null
}
