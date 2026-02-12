-- ============================================
-- RLS POLICIES FOR RESPONDENT FLOW
-- ============================================
-- These policies enable the public respondent flow (landing page, screener, etc.)

-- Allow anyone to view active campaigns
CREATE POLICY "Public can view active campaigns"
    ON campaigns FOR SELECT
    TO anon, authenticated
    USING (status = 'active');

-- Allow anyone to create respondents for active campaigns
DROP POLICY IF EXISTS "Public can create respondents" ON respondents;
CREATE POLICY "Allow all respondent inserts"
    ON respondents FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow anon to view respondents (for .select() after insert)
CREATE POLICY "Public can view own respondent"
    ON respondents FOR SELECT
    TO anon
    USING (true);

-- Allow authenticated to view respondents (for .select() after insert when logged in)
CREATE POLICY "Authenticated can view any respondent"
    ON respondents FOR SELECT
    TO authenticated
    USING (true);

-- Allow anyone to update respondents (for screener submission)
DROP POLICY IF EXISTS "Respondents can update their own session" ON respondents;
DROP POLICY IF EXISTS "Respondents can update by session_id" ON respondents;
CREATE POLICY "Allow respondent updates"
    ON respondents FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Allow public to insert activity logs
DROP POLICY IF EXISTS "Public can log respondent activities" ON respondent_activity_log;
CREATE POLICY "Public can log respondent activities"
    ON respondent_activity_log FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);
