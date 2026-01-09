-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ORGANIZATIONS (Multi-tenant)
-- ============================================
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USERS (Extends Supabase auth.users)
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
    avatar_url TEXT,
    last_seen_at TIMESTAMPTZ,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DISTRICTS
-- ============================================
CREATE TABLE districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, code)
);

-- ============================================
-- ZIP CODES
-- ============================================
CREATE TABLE zip_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zip TEXT NOT NULL,
    district_id UUID REFERENCES districts(id) ON DELETE SET NULL,
    city TEXT,
    state TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_zip_codes_zip ON zip_codes(zip);

-- ============================================
-- CAMPAIGNS
-- ============================================
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'paused', 'completed', 'archived')),
    objective TEXT NOT NULL DEFAULT 'online_survey' CHECK (objective IN ('online_survey', 'focus_group')),

    -- Basics
    survey_url TEXT,
    desired_completes INTEGER NOT NULL DEFAULT 100,
    start_date DATE,
    end_date DATE,

    -- Incentives
    incentive_amount DECIMAL(10, 2) DEFAULT 15.00,
    incentive_method TEXT DEFAULT 'gift_card' CHECK (incentive_method IN ('gift_card', 'paypal', 'manual')),
    completion_definition TEXT DEFAULT 'webhook' CHECK (completion_definition IN ('webhook', 'manual')),

    -- Channels & Budget
    meta_ads_enabled BOOLEAN DEFAULT false,
    google_ads_enabled BOOLEAN DEFAULT false,
    meta_daily_budget DECIMAL(10, 2),
    google_daily_budget DECIMAL(10, 2),

    -- UTM Settings
    utm_source TEXT DEFAULT '{channel}',
    utm_medium TEXT DEFAULT 'cpc',
    utm_campaign TEXT,

    -- Creative
    meta_headline TEXT,
    meta_body TEXT,
    google_headlines JSONB DEFAULT '[]',
    google_descriptions JSONB DEFAULT '[]',

    -- Overfill
    overfill_handling TEXT DEFAULT 'stop' CHECK (overfill_handling IN ('stop', 'allow_10', 'redirect')),

    -- Consent
    consent_text TEXT,
    privacy_policy_url TEXT,
    contact_email TEXT,

    -- Metadata
    settings JSONB DEFAULT '{}',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(organization_id, slug)
);

-- ============================================
-- CAMPAIGN DISTRICTS (Junction)
-- ============================================
CREATE TABLE campaign_districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    district_id UUID NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
    target_completes INTEGER NOT NULL DEFAULT 100,
    daily_budget DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(campaign_id, district_id)
);

-- ============================================
-- CAMPAIGN ZIP CODES
-- ============================================
CREATE TABLE campaign_zip_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    zip_code_id UUID NOT NULL REFERENCES zip_codes(id) ON DELETE CASCADE,
    target INTEGER DEFAULT 0,
    pause_at INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(campaign_id, zip_code_id)
);

-- ============================================
-- SCREENER QUESTIONS
-- ============================================
CREATE TABLE screener_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('single_choice', 'multi_choice', 'text', 'zip_code', 'number', 'scale')),
    options JSONB DEFAULT '[]',
    validation_rules JSONB DEFAULT '{}',
    error_message TEXT,
    is_required BOOLEAN DEFAULT true,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONSENT VERSIONS
-- ============================================
CREATE TABLE consent_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    version TEXT NOT NULL DEFAULT '1.0',
    consent_text TEXT NOT NULL,
    acknowledgments JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(campaign_id, version)
);

-- ============================================
-- RESPONDENTS
-- ============================================
CREATE TABLE respondents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,

    -- Session
    session_id TEXT,

    -- Identity (minimal PII)
    email TEXT,
    phone TEXT,

    -- Location
    zip_code TEXT,
    zip_code_id UUID REFERENCES zip_codes(id),
    district_id UUID REFERENCES districts(id),

    -- Tracking
    external_id TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    channel TEXT,
    search_query TEXT,

    -- Status
    status TEXT NOT NULL DEFAULT 'landed' CHECK (status IN (
        'landed', 'consented', 'screener_started', 'screener_passed',
        'screener_failed', 'survey_started', 'survey_completed',
        'payout_pending', 'payout_sent', 'payout_failed'
    )),

    -- Screener
    screener_responses JSONB DEFAULT '{}',
    is_qualified BOOLEAN,

    -- Consent
    consent_version_id UUID REFERENCES consent_versions(id),
    consented_at TIMESTAMPTZ,

    -- Survey
    survey_started_at TIMESTAMPTZ,
    survey_completed_at TIMESTAMPTZ,
    survey_responses JSONB DEFAULT '{}',
    quality_score DECIMAL(3, 1),

    -- Payout
    payout_amount DECIMAL(10, 2),
    payout_method TEXT,
    payout_email TEXT,
    payout_sent_at TIMESTAMPTZ,
    payout_error TEXT,

    -- Metadata
    user_agent TEXT,
    ip_address INET,
    device_type TEXT,
    browser TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RESPONDENT ACTIVITY LOG
-- ============================================
CREATE TABLE respondent_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    respondent_id UUID NOT NULL REFERENCES respondents(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUOTA TRACKING
-- ============================================
CREATE TABLE quota_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    district_id UUID REFERENCES districts(id),
    zip_code_id UUID REFERENCES zip_codes(id),
    target INTEGER NOT NULL DEFAULT 0,
    filled INTEGER NOT NULL DEFAULT 0,
    pause_at INTEGER,
    is_paused BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE NULLS NOT DISTINCT (campaign_id, district_id, zip_code_id)
);

-- ============================================
-- PAYOUTS
-- ============================================
CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    respondent_id UUID NOT NULL REFERENCES respondents(id) ON DELETE CASCADE,
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,

    amount DECIMAL(10, 2) NOT NULL,
    method TEXT NOT NULL,
    recipient_email TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')),

    provider TEXT,
    provider_order_id TEXT,
    provider_response JSONB DEFAULT '{}',

    processed_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    error_message TEXT,

    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GIFT CARD SETTINGS (Org-level)
-- ============================================
CREATE TABLE gift_card_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE UNIQUE,
    provider TEXT NOT NULL DEFAULT 'tremendous' CHECK (provider IN ('tremendous', 'cardivo')),
    cardivo_api_key_encrypted TEXT,
    tremendous_api_key_encrypted TEXT,
    default_product_id TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AD CONNECTIONS
-- ============================================
CREATE TABLE ad_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('meta', 'google')),

    account_id TEXT,
    account_name TEXT,

    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,

    is_connected BOOLEAN DEFAULT false,
    last_synced_at TIMESTAMPTZ,
    settings JSONB DEFAULT '{}',

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(organization_id, platform)
);

-- ============================================
-- CAMPAIGN EVENTS (Analytics)
-- ============================================
CREATE TABLE campaign_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    district_id UUID REFERENCES districts(id),
    channel TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_respondents_campaign ON respondents(campaign_id);
CREATE INDEX idx_respondents_status ON respondents(status);
CREATE INDEX idx_respondents_zip ON respondents(zip_code);
CREATE INDEX idx_respondents_session ON respondents(session_id);
CREATE INDEX idx_respondents_created ON respondents(created_at DESC);
CREATE INDEX idx_respondent_activity_respondent ON respondent_activity_log(respondent_id);
CREATE INDEX idx_respondent_activity_created ON respondent_activity_log(created_at DESC);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_campaign ON payouts(campaign_id);
CREATE INDEX idx_campaign_events_campaign ON campaign_events(campaign_id);
CREATE INDEX idx_campaign_events_created ON campaign_events(created_at DESC);
CREATE INDEX idx_quota_tracking_campaign ON quota_tracking(campaign_id);
CREATE INDEX idx_campaigns_org ON campaigns(organization_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_users_org ON users(organization_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_respondents_updated_at
    BEFORE UPDATE ON respondents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payouts_updated_at
    BEFORE UPDATE ON payouts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_screener_questions_updated_at
    BEFORE UPDATE ON screener_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gift_card_settings_updated_at
    BEFORE UPDATE ON gift_card_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ad_connections_updated_at
    BEFORE UPDATE ON ad_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update quota tracking on respondent status change
CREATE OR REPLACE FUNCTION update_quota_on_complete()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'survey_completed' AND (OLD.status IS NULL OR OLD.status != 'survey_completed') THEN
        -- Update district quota
        UPDATE quota_tracking
        SET filled = filled + 1, updated_at = NOW()
        WHERE campaign_id = NEW.campaign_id
          AND district_id = NEW.district_id
          AND zip_code_id IS NULL;

        -- Update ZIP quota if exists
        IF NEW.zip_code_id IS NOT NULL THEN
            UPDATE quota_tracking
            SET filled = filled + 1, updated_at = NOW()
            WHERE campaign_id = NEW.campaign_id
              AND zip_code_id = NEW.zip_code_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_quota_on_complete
    AFTER INSERT OR UPDATE ON respondents
    FOR EACH ROW EXECUTE FUNCTION update_quota_on_complete();

-- Auto-create user profile on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
