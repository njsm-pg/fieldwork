-- ============================================
-- FIX CAMPAIGN CREATION POLICY
-- ============================================

-- Drop existing campaign insert policy
DROP POLICY IF EXISTS "Editors can create org campaigns" ON campaigns;

-- Allow any authenticated user to create campaigns for their organization
-- (organization-level permissions can be handled at app level)
CREATE POLICY "Users can create org campaigns"
    ON campaigns FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND organization_id = get_user_org_id()
    );

-- Also fix campaign_districts insert policy
DROP POLICY IF EXISTS "Editors can manage campaign districts" ON campaign_districts;

CREATE POLICY "Users can manage campaign districts"
    ON campaign_districts FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

-- Fix quota_tracking insert policy
DROP POLICY IF EXISTS "Editors can manage quotas" ON quota_tracking;

CREATE POLICY "Users can manage quotas"
    ON quota_tracking FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

-- Fix screener_questions insert policy
DROP POLICY IF EXISTS "Editors can manage screener questions" ON screener_questions;

CREATE POLICY "Users can manage screener questions"
    ON screener_questions FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );

-- Fix consent_versions insert policy
DROP POLICY IF EXISTS "Editors can manage consent versions" ON consent_versions;

CREATE POLICY "Users can manage consent versions"
    ON consent_versions FOR ALL
    USING (
        campaign_id IN (
            SELECT id FROM campaigns WHERE organization_id = get_user_org_id()
        )
    );
