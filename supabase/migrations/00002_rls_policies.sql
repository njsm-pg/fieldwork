-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE zip_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_zip_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE screener_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE respondents ENABLE ROW LEVEL SECURITY;
ALTER TABLE respondent_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE quota_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_card_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_events ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Get current user's organization ID
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
    SELECT organization_id FROM users WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if user has role
CREATE OR REPLACE FUNCTION user_has_role(required_role TEXT)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM users
        WHERE id = auth.uid()
        AND (
            role = required_role
            OR (required_role = 'editor' AND role = 'admin')
            OR (required_role = 'viewer' AND role IN ('admin', 'editor'))
        )
    )
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================
-- ORGANIZATIONS POLICIES
-- ============================================

CREATE POLICY "Users can view their organization"
    ON organizations FOR SELECT
    USING (id = get_user_org_id());

CREATE POLICY "Admins can update their organization"
    ON organizations FOR UPDATE
    USING (id = get_user_org_id() AND user_has_role('admin'));

-- ============================================
-- USERS POLICIES
-- ============================================

CREATE POLICY "Users can view org members"
    ON users FOR SELECT
    USING (organization_id = get_user_org_id() OR id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "Admins can manage org users"
    ON users FOR ALL
    USING (
        organization_id = get_user_org_id()
        AND user_has_role('admin')
    );

-- ============================================
-- DISTRICTS POLICIES
-- ============================================

CREATE POLICY "Users can view org districts"
    ON districts FOR SELECT
    USING (organization_id = get_user_org_id());

CREATE POLICY "Editors can manage org districts"
    ON districts FOR ALL
    USING (organization_id = get_user_org_id() AND user_has_role('editor'));

-- ============================================
-- ZIP CODES POLICIES
-- ============================================

CREATE POLICY "Anyone can view zip codes"
    ON zip_codes FOR SELECT
    USING (true);

-- ============================================
-- CAMPAIGNS POLICIES
-- ============================================

CREATE POLICY "Users can view org campaigns"
    ON campaigns FOR SELECT
    USING (organization_id = get_user_org_id());

CREATE POLICY "Editors can create org campaigns"
    ON campaigns FOR INSERT
    WITH CHECK (organization_id = get_user_org_id() AND user_has_role('editor'));

CREATE POLICY "Editors can update org campaigns"
    ON campaigns FOR UPDATE
    USING (organization_id = get_user_org_id() AND user_has_role('editor'));

CREATE POLICY "Admins can delete org campaigns"
    ON campaigns FOR DELETE
    USING (organization_id = get_user_org_id() AND user_has_role('admin'));

-- ============================================
-- CAMPAIGN DISTRICTS POLICIES
-- ============================================

CREATE POLICY "Users can view campaign districts"
    ON campaign_districts FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

CREATE POLICY "Editors can manage campaign districts"
    ON campaign_districts FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
        AND user_has_role('editor')
    );

-- ============================================
-- CAMPAIGN ZIP CODES POLICIES
-- ============================================

CREATE POLICY "Users can view campaign zip codes"
    ON campaign_zip_codes FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

CREATE POLICY "Editors can manage campaign zip codes"
    ON campaign_zip_codes FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
        AND user_has_role('editor')
    );

-- ============================================
-- SCREENER QUESTIONS POLICIES
-- ============================================

CREATE POLICY "Users can view campaign screener questions"
    ON screener_questions FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

CREATE POLICY "Editors can manage screener questions"
    ON screener_questions FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
        AND user_has_role('editor')
    );

-- Public access for respondent flow
CREATE POLICY "Public can view active campaign screeners"
    ON screener_questions FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE status = 'active'
        )
    );

-- ============================================
-- CONSENT VERSIONS POLICIES
-- ============================================

CREATE POLICY "Users can view campaign consent versions"
    ON consent_versions FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

CREATE POLICY "Editors can manage consent versions"
    ON consent_versions FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
        AND user_has_role('editor')
    );

-- Public access for respondent flow
CREATE POLICY "Public can view active campaign consent"
    ON consent_versions FOR SELECT
    USING (
        is_active = true
        AND campaign_id IN (
            SELECT id FROM campaigns WHERE status = 'active'
        )
    );

-- ============================================
-- RESPONDENTS POLICIES
-- ============================================

CREATE POLICY "Users can view org respondents"
    ON respondents FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

-- Public insert for respondent flow (anonymous)
CREATE POLICY "Public can create respondents"
    ON respondents FOR INSERT
    WITH CHECK (
        campaign_id IN (
            SELECT id FROM campaigns WHERE status = 'active'
        )
    );

-- Public update for respondent flow (session-based)
CREATE POLICY "Respondents can update their own session"
    ON respondents FOR UPDATE
    USING (
        session_id IS NOT NULL
        AND session_id = current_setting('app.session_id', true)
    );

-- Admins can update any respondent in their org
CREATE POLICY "Admins can update org respondents"
    ON respondents FOR UPDATE
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
        AND user_has_role('admin')
    );

-- ============================================
-- RESPONDENT ACTIVITY LOG POLICIES
-- ============================================

CREATE POLICY "Users can view org respondent activities"
    ON respondent_activity_log FOR SELECT
    USING (
        respondent_id IN (
            SELECT id FROM respondents
            WHERE campaign_id IN (
                SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
            )
        )
    );

-- Public insert for respondent flow
CREATE POLICY "Public can log respondent activities"
    ON respondent_activity_log FOR INSERT
    WITH CHECK (
        respondent_id IN (
            SELECT id FROM respondents
            WHERE session_id = current_setting('app.session_id', true)
        )
    );

-- ============================================
-- QUOTA TRACKING POLICIES
-- ============================================

CREATE POLICY "Users can view org quotas"
    ON quota_tracking FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

CREATE POLICY "Editors can manage quotas"
    ON quota_tracking FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
        AND user_has_role('editor')
    );

-- ============================================
-- PAYOUTS POLICIES
-- ============================================

CREATE POLICY "Users can view org payouts"
    ON payouts FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

CREATE POLICY "Admins can manage payouts"
    ON payouts FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
        AND user_has_role('admin')
    );

-- ============================================
-- GIFT CARD SETTINGS POLICIES
-- ============================================

CREATE POLICY "Admins can view gift card settings"
    ON gift_card_settings FOR SELECT
    USING (organization_id = get_user_org_id() AND user_has_role('admin'));

CREATE POLICY "Admins can manage gift card settings"
    ON gift_card_settings FOR ALL
    USING (organization_id = get_user_org_id() AND user_has_role('admin'));

-- ============================================
-- AD CONNECTIONS POLICIES
-- ============================================

CREATE POLICY "Users can view ad connections"
    ON ad_connections FOR SELECT
    USING (organization_id = get_user_org_id());

CREATE POLICY "Admins can manage ad connections"
    ON ad_connections FOR ALL
    USING (organization_id = get_user_org_id() AND user_has_role('admin'));

-- ============================================
-- CAMPAIGN EVENTS POLICIES
-- ============================================

CREATE POLICY "Users can view org campaign events"
    ON campaign_events FOR SELECT
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

CREATE POLICY "System can insert campaign events"
    ON campaign_events FOR INSERT
    WITH CHECK (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );
