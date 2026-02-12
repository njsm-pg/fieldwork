-- ============================================
-- ADD FIRST_NAME AND LAST_NAME TO RESPONDENTS
-- ============================================
-- For focus group recruitment, we need to capture respondent names
-- to facilitate scheduling and communication

ALTER TABLE respondents
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add an index for name searches (useful for finding respondents)
CREATE INDEX IF NOT EXISTS idx_respondents_names
ON respondents (first_name, last_name);

-- Add comment for documentation
COMMENT ON COLUMN respondents.first_name IS 'Respondent first name, collected during focus group screener';
COMMENT ON COLUMN respondents.last_name IS 'Respondent last name, collected during focus group screener';
