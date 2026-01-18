-- ============================================
-- GLOBAL CONGRESSIONAL DISTRICTS MIGRATION
-- ============================================

-- 1. Make organization_id nullable on districts table
ALTER TABLE districts ALTER COLUMN organization_id DROP NOT NULL;

-- 2. Drop existing unique constraint and create new ones
-- Global districts: unique on code alone (when org_id is NULL)
-- Org districts: unique on org_id + code (existing behavior)
ALTER TABLE districts DROP CONSTRAINT IF EXISTS districts_organization_id_code_key;

-- Create partial unique index for global districts (organization_id IS NULL)
CREATE UNIQUE INDEX idx_districts_global_code ON districts(code) WHERE organization_id IS NULL;

-- Create partial unique index for org-specific districts
CREATE UNIQUE INDEX idx_districts_org_code ON districts(organization_id, code) WHERE organization_id IS NOT NULL;

-- 3. Update RLS policies to allow viewing global districts
DROP POLICY IF EXISTS "Users can view org districts" ON districts;
DROP POLICY IF EXISTS "Editors can manage org districts" ON districts;

-- Allow viewing global districts OR org-specific districts
CREATE POLICY "Users can view global and org districts"
    ON districts FOR SELECT
    USING (
        organization_id IS NULL
        OR organization_id = get_user_org_id()
    );

-- Editors can only manage org-specific districts (not global ones)
CREATE POLICY "Editors can manage org districts"
    ON districts FOR ALL
    USING (
        organization_id IS NOT NULL
        AND organization_id = get_user_org_id()
        AND user_has_role('editor')
    );

-- 4. Seed all 435 US Congressional Districts
-- First, clear any existing global districts to avoid conflicts
DELETE FROM districts WHERE organization_id IS NULL;

-- Insert all congressional districts
INSERT INTO districts (organization_id, code, name, state, metadata) VALUES
-- Alabama (7 districts)
(NULL, 'AL-01', 'Alabama 1st Congressional District', 'Alabama', '{"representative": ""}'),
(NULL, 'AL-02', 'Alabama 2nd Congressional District', 'Alabama', '{"representative": ""}'),
(NULL, 'AL-03', 'Alabama 3rd Congressional District', 'Alabama', '{"representative": ""}'),
(NULL, 'AL-04', 'Alabama 4th Congressional District', 'Alabama', '{"representative": ""}'),
(NULL, 'AL-05', 'Alabama 5th Congressional District', 'Alabama', '{"representative": ""}'),
(NULL, 'AL-06', 'Alabama 6th Congressional District', 'Alabama', '{"representative": ""}'),
(NULL, 'AL-07', 'Alabama 7th Congressional District', 'Alabama', '{"representative": ""}'),

-- Alaska (1 district - at-large)
(NULL, 'AK-AL', 'Alaska At-Large Congressional District', 'Alaska', '{"representative": ""}'),

-- Arizona (9 districts)
(NULL, 'AZ-01', 'Arizona 1st Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-02', 'Arizona 2nd Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-03', 'Arizona 3rd Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-04', 'Arizona 4th Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-05', 'Arizona 5th Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-06', 'Arizona 6th Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-07', 'Arizona 7th Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-08', 'Arizona 8th Congressional District', 'Arizona', '{"representative": ""}'),
(NULL, 'AZ-09', 'Arizona 9th Congressional District', 'Arizona', '{"representative": ""}'),

-- Arkansas (4 districts)
(NULL, 'AR-01', 'Arkansas 1st Congressional District', 'Arkansas', '{"representative": ""}'),
(NULL, 'AR-02', 'Arkansas 2nd Congressional District', 'Arkansas', '{"representative": ""}'),
(NULL, 'AR-03', 'Arkansas 3rd Congressional District', 'Arkansas', '{"representative": ""}'),
(NULL, 'AR-04', 'Arkansas 4th Congressional District', 'Arkansas', '{"representative": ""}'),

-- California (52 districts)
(NULL, 'CA-01', 'California 1st Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-02', 'California 2nd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-03', 'California 3rd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-04', 'California 4th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-05', 'California 5th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-06', 'California 6th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-07', 'California 7th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-08', 'California 8th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-09', 'California 9th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-10', 'California 10th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-11', 'California 11th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-12', 'California 12th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-13', 'California 13th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-14', 'California 14th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-15', 'California 15th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-16', 'California 16th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-17', 'California 17th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-18', 'California 18th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-19', 'California 19th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-20', 'California 20th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-21', 'California 21st Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-22', 'California 22nd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-23', 'California 23rd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-24', 'California 24th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-25', 'California 25th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-26', 'California 26th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-27', 'California 27th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-28', 'California 28th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-29', 'California 29th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-30', 'California 30th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-31', 'California 31st Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-32', 'California 32nd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-33', 'California 33rd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-34', 'California 34th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-35', 'California 35th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-36', 'California 36th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-37', 'California 37th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-38', 'California 38th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-39', 'California 39th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-40', 'California 40th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-41', 'California 41st Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-42', 'California 42nd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-43', 'California 43rd Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-44', 'California 44th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-45', 'California 45th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-46', 'California 46th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-47', 'California 47th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-48', 'California 48th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-49', 'California 49th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-50', 'California 50th Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-51', 'California 51st Congressional District', 'California', '{"representative": ""}'),
(NULL, 'CA-52', 'California 52nd Congressional District', 'California', '{"representative": ""}'),

-- Colorado (8 districts)
(NULL, 'CO-01', 'Colorado 1st Congressional District', 'Colorado', '{"representative": ""}'),
(NULL, 'CO-02', 'Colorado 2nd Congressional District', 'Colorado', '{"representative": ""}'),
(NULL, 'CO-03', 'Colorado 3rd Congressional District', 'Colorado', '{"representative": ""}'),
(NULL, 'CO-04', 'Colorado 4th Congressional District', 'Colorado', '{"representative": ""}'),
(NULL, 'CO-05', 'Colorado 5th Congressional District', 'Colorado', '{"representative": ""}'),
(NULL, 'CO-06', 'Colorado 6th Congressional District', 'Colorado', '{"representative": ""}'),
(NULL, 'CO-07', 'Colorado 7th Congressional District', 'Colorado', '{"representative": ""}'),
(NULL, 'CO-08', 'Colorado 8th Congressional District', 'Colorado', '{"representative": ""}'),

-- Connecticut (5 districts)
(NULL, 'CT-01', 'Connecticut 1st Congressional District', 'Connecticut', '{"representative": ""}'),
(NULL, 'CT-02', 'Connecticut 2nd Congressional District', 'Connecticut', '{"representative": ""}'),
(NULL, 'CT-03', 'Connecticut 3rd Congressional District', 'Connecticut', '{"representative": ""}'),
(NULL, 'CT-04', 'Connecticut 4th Congressional District', 'Connecticut', '{"representative": ""}'),
(NULL, 'CT-05', 'Connecticut 5th Congressional District', 'Connecticut', '{"representative": ""}'),

-- Delaware (1 district - at-large)
(NULL, 'DE-AL', 'Delaware At-Large Congressional District', 'Delaware', '{"representative": ""}'),

-- Florida (28 districts)
(NULL, 'FL-01', 'Florida 1st Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-02', 'Florida 2nd Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-03', 'Florida 3rd Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-04', 'Florida 4th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-05', 'Florida 5th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-06', 'Florida 6th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-07', 'Florida 7th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-08', 'Florida 8th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-09', 'Florida 9th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-10', 'Florida 10th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-11', 'Florida 11th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-12', 'Florida 12th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-13', 'Florida 13th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-14', 'Florida 14th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-15', 'Florida 15th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-16', 'Florida 16th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-17', 'Florida 17th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-18', 'Florida 18th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-19', 'Florida 19th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-20', 'Florida 20th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-21', 'Florida 21st Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-22', 'Florida 22nd Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-23', 'Florida 23rd Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-24', 'Florida 24th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-25', 'Florida 25th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-26', 'Florida 26th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-27', 'Florida 27th Congressional District', 'Florida', '{"representative": ""}'),
(NULL, 'FL-28', 'Florida 28th Congressional District', 'Florida', '{"representative": ""}'),

-- Georgia (14 districts)
(NULL, 'GA-01', 'Georgia 1st Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-02', 'Georgia 2nd Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-03', 'Georgia 3rd Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-04', 'Georgia 4th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-05', 'Georgia 5th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-06', 'Georgia 6th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-07', 'Georgia 7th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-08', 'Georgia 8th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-09', 'Georgia 9th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-10', 'Georgia 10th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-11', 'Georgia 11th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-12', 'Georgia 12th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-13', 'Georgia 13th Congressional District', 'Georgia', '{"representative": ""}'),
(NULL, 'GA-14', 'Georgia 14th Congressional District', 'Georgia', '{"representative": ""}'),

-- Hawaii (2 districts)
(NULL, 'HI-01', 'Hawaii 1st Congressional District', 'Hawaii', '{"representative": ""}'),
(NULL, 'HI-02', 'Hawaii 2nd Congressional District', 'Hawaii', '{"representative": ""}'),

-- Idaho (2 districts)
(NULL, 'ID-01', 'Idaho 1st Congressional District', 'Idaho', '{"representative": ""}'),
(NULL, 'ID-02', 'Idaho 2nd Congressional District', 'Idaho', '{"representative": ""}'),

-- Illinois (17 districts)
(NULL, 'IL-01', 'Illinois 1st Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-02', 'Illinois 2nd Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-03', 'Illinois 3rd Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-04', 'Illinois 4th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-05', 'Illinois 5th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-06', 'Illinois 6th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-07', 'Illinois 7th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-08', 'Illinois 8th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-09', 'Illinois 9th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-10', 'Illinois 10th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-11', 'Illinois 11th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-12', 'Illinois 12th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-13', 'Illinois 13th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-14', 'Illinois 14th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-15', 'Illinois 15th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-16', 'Illinois 16th Congressional District', 'Illinois', '{"representative": ""}'),
(NULL, 'IL-17', 'Illinois 17th Congressional District', 'Illinois', '{"representative": ""}'),

-- Indiana (9 districts)
(NULL, 'IN-01', 'Indiana 1st Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-02', 'Indiana 2nd Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-03', 'Indiana 3rd Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-04', 'Indiana 4th Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-05', 'Indiana 5th Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-06', 'Indiana 6th Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-07', 'Indiana 7th Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-08', 'Indiana 8th Congressional District', 'Indiana', '{"representative": ""}'),
(NULL, 'IN-09', 'Indiana 9th Congressional District', 'Indiana', '{"representative": ""}'),

-- Iowa (4 districts)
(NULL, 'IA-01', 'Iowa 1st Congressional District', 'Iowa', '{"representative": ""}'),
(NULL, 'IA-02', 'Iowa 2nd Congressional District', 'Iowa', '{"representative": ""}'),
(NULL, 'IA-03', 'Iowa 3rd Congressional District', 'Iowa', '{"representative": ""}'),
(NULL, 'IA-04', 'Iowa 4th Congressional District', 'Iowa', '{"representative": ""}'),

-- Kansas (4 districts)
(NULL, 'KS-01', 'Kansas 1st Congressional District', 'Kansas', '{"representative": ""}'),
(NULL, 'KS-02', 'Kansas 2nd Congressional District', 'Kansas', '{"representative": ""}'),
(NULL, 'KS-03', 'Kansas 3rd Congressional District', 'Kansas', '{"representative": ""}'),
(NULL, 'KS-04', 'Kansas 4th Congressional District', 'Kansas', '{"representative": ""}'),

-- Kentucky (6 districts)
(NULL, 'KY-01', 'Kentucky 1st Congressional District', 'Kentucky', '{"representative": ""}'),
(NULL, 'KY-02', 'Kentucky 2nd Congressional District', 'Kentucky', '{"representative": ""}'),
(NULL, 'KY-03', 'Kentucky 3rd Congressional District', 'Kentucky', '{"representative": ""}'),
(NULL, 'KY-04', 'Kentucky 4th Congressional District', 'Kentucky', '{"representative": ""}'),
(NULL, 'KY-05', 'Kentucky 5th Congressional District', 'Kentucky', '{"representative": ""}'),
(NULL, 'KY-06', 'Kentucky 6th Congressional District', 'Kentucky', '{"representative": ""}'),

-- Louisiana (6 districts)
(NULL, 'LA-01', 'Louisiana 1st Congressional District', 'Louisiana', '{"representative": ""}'),
(NULL, 'LA-02', 'Louisiana 2nd Congressional District', 'Louisiana', '{"representative": ""}'),
(NULL, 'LA-03', 'Louisiana 3rd Congressional District', 'Louisiana', '{"representative": ""}'),
(NULL, 'LA-04', 'Louisiana 4th Congressional District', 'Louisiana', '{"representative": ""}'),
(NULL, 'LA-05', 'Louisiana 5th Congressional District', 'Louisiana', '{"representative": ""}'),
(NULL, 'LA-06', 'Louisiana 6th Congressional District', 'Louisiana', '{"representative": ""}'),

-- Maine (2 districts)
(NULL, 'ME-01', 'Maine 1st Congressional District', 'Maine', '{"representative": ""}'),
(NULL, 'ME-02', 'Maine 2nd Congressional District', 'Maine', '{"representative": ""}'),

-- Maryland (8 districts)
(NULL, 'MD-01', 'Maryland 1st Congressional District', 'Maryland', '{"representative": ""}'),
(NULL, 'MD-02', 'Maryland 2nd Congressional District', 'Maryland', '{"representative": ""}'),
(NULL, 'MD-03', 'Maryland 3rd Congressional District', 'Maryland', '{"representative": ""}'),
(NULL, 'MD-04', 'Maryland 4th Congressional District', 'Maryland', '{"representative": ""}'),
(NULL, 'MD-05', 'Maryland 5th Congressional District', 'Maryland', '{"representative": ""}'),
(NULL, 'MD-06', 'Maryland 6th Congressional District', 'Maryland', '{"representative": ""}'),
(NULL, 'MD-07', 'Maryland 7th Congressional District', 'Maryland', '{"representative": ""}'),
(NULL, 'MD-08', 'Maryland 8th Congressional District', 'Maryland', '{"representative": ""}'),

-- Massachusetts (9 districts)
(NULL, 'MA-01', 'Massachusetts 1st Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-02', 'Massachusetts 2nd Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-03', 'Massachusetts 3rd Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-04', 'Massachusetts 4th Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-05', 'Massachusetts 5th Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-06', 'Massachusetts 6th Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-07', 'Massachusetts 7th Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-08', 'Massachusetts 8th Congressional District', 'Massachusetts', '{"representative": ""}'),
(NULL, 'MA-09', 'Massachusetts 9th Congressional District', 'Massachusetts', '{"representative": ""}'),

-- Michigan (13 districts)
(NULL, 'MI-01', 'Michigan 1st Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-02', 'Michigan 2nd Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-03', 'Michigan 3rd Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-04', 'Michigan 4th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-05', 'Michigan 5th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-06', 'Michigan 6th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-07', 'Michigan 7th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-08', 'Michigan 8th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-09', 'Michigan 9th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-10', 'Michigan 10th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-11', 'Michigan 11th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-12', 'Michigan 12th Congressional District', 'Michigan', '{"representative": ""}'),
(NULL, 'MI-13', 'Michigan 13th Congressional District', 'Michigan', '{"representative": ""}'),

-- Minnesota (8 districts)
(NULL, 'MN-01', 'Minnesota 1st Congressional District', 'Minnesota', '{"representative": ""}'),
(NULL, 'MN-02', 'Minnesota 2nd Congressional District', 'Minnesota', '{"representative": ""}'),
(NULL, 'MN-03', 'Minnesota 3rd Congressional District', 'Minnesota', '{"representative": ""}'),
(NULL, 'MN-04', 'Minnesota 4th Congressional District', 'Minnesota', '{"representative": ""}'),
(NULL, 'MN-05', 'Minnesota 5th Congressional District', 'Minnesota', '{"representative": ""}'),
(NULL, 'MN-06', 'Minnesota 6th Congressional District', 'Minnesota', '{"representative": ""}'),
(NULL, 'MN-07', 'Minnesota 7th Congressional District', 'Minnesota', '{"representative": ""}'),
(NULL, 'MN-08', 'Minnesota 8th Congressional District', 'Minnesota', '{"representative": ""}'),

-- Mississippi (4 districts)
(NULL, 'MS-01', 'Mississippi 1st Congressional District', 'Mississippi', '{"representative": ""}'),
(NULL, 'MS-02', 'Mississippi 2nd Congressional District', 'Mississippi', '{"representative": ""}'),
(NULL, 'MS-03', 'Mississippi 3rd Congressional District', 'Mississippi', '{"representative": ""}'),
(NULL, 'MS-04', 'Mississippi 4th Congressional District', 'Mississippi', '{"representative": ""}'),

-- Missouri (8 districts)
(NULL, 'MO-01', 'Missouri 1st Congressional District', 'Missouri', '{"representative": ""}'),
(NULL, 'MO-02', 'Missouri 2nd Congressional District', 'Missouri', '{"representative": ""}'),
(NULL, 'MO-03', 'Missouri 3rd Congressional District', 'Missouri', '{"representative": ""}'),
(NULL, 'MO-04', 'Missouri 4th Congressional District', 'Missouri', '{"representative": ""}'),
(NULL, 'MO-05', 'Missouri 5th Congressional District', 'Missouri', '{"representative": ""}'),
(NULL, 'MO-06', 'Missouri 6th Congressional District', 'Missouri', '{"representative": ""}'),
(NULL, 'MO-07', 'Missouri 7th Congressional District', 'Missouri', '{"representative": ""}'),
(NULL, 'MO-08', 'Missouri 8th Congressional District', 'Missouri', '{"representative": ""}'),

-- Montana (2 districts)
(NULL, 'MT-01', 'Montana 1st Congressional District', 'Montana', '{"representative": ""}'),
(NULL, 'MT-02', 'Montana 2nd Congressional District', 'Montana', '{"representative": ""}'),

-- Nebraska (3 districts)
(NULL, 'NE-01', 'Nebraska 1st Congressional District', 'Nebraska', '{"representative": ""}'),
(NULL, 'NE-02', 'Nebraska 2nd Congressional District', 'Nebraska', '{"representative": ""}'),
(NULL, 'NE-03', 'Nebraska 3rd Congressional District', 'Nebraska', '{"representative": ""}'),

-- Nevada (4 districts)
(NULL, 'NV-01', 'Nevada 1st Congressional District', 'Nevada', '{"representative": ""}'),
(NULL, 'NV-02', 'Nevada 2nd Congressional District', 'Nevada', '{"representative": ""}'),
(NULL, 'NV-03', 'Nevada 3rd Congressional District', 'Nevada', '{"representative": ""}'),
(NULL, 'NV-04', 'Nevada 4th Congressional District', 'Nevada', '{"representative": ""}'),

-- New Hampshire (2 districts)
(NULL, 'NH-01', 'New Hampshire 1st Congressional District', 'New Hampshire', '{"representative": ""}'),
(NULL, 'NH-02', 'New Hampshire 2nd Congressional District', 'New Hampshire', '{"representative": ""}'),

-- New Jersey (12 districts)
(NULL, 'NJ-01', 'New Jersey 1st Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-02', 'New Jersey 2nd Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-03', 'New Jersey 3rd Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-04', 'New Jersey 4th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-05', 'New Jersey 5th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-06', 'New Jersey 6th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-07', 'New Jersey 7th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-08', 'New Jersey 8th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-09', 'New Jersey 9th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-10', 'New Jersey 10th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-11', 'New Jersey 11th Congressional District', 'New Jersey', '{"representative": ""}'),
(NULL, 'NJ-12', 'New Jersey 12th Congressional District', 'New Jersey', '{"representative": ""}'),

-- New Mexico (3 districts)
(NULL, 'NM-01', 'New Mexico 1st Congressional District', 'New Mexico', '{"representative": ""}'),
(NULL, 'NM-02', 'New Mexico 2nd Congressional District', 'New Mexico', '{"representative": ""}'),
(NULL, 'NM-03', 'New Mexico 3rd Congressional District', 'New Mexico', '{"representative": ""}'),

-- New York (26 districts)
(NULL, 'NY-01', 'New York 1st Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-02', 'New York 2nd Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-03', 'New York 3rd Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-04', 'New York 4th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-05', 'New York 5th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-06', 'New York 6th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-07', 'New York 7th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-08', 'New York 8th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-09', 'New York 9th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-10', 'New York 10th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-11', 'New York 11th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-12', 'New York 12th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-13', 'New York 13th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-14', 'New York 14th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-15', 'New York 15th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-16', 'New York 16th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-17', 'New York 17th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-18', 'New York 18th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-19', 'New York 19th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-20', 'New York 20th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-21', 'New York 21st Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-22', 'New York 22nd Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-23', 'New York 23rd Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-24', 'New York 24th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-25', 'New York 25th Congressional District', 'New York', '{"representative": ""}'),
(NULL, 'NY-26', 'New York 26th Congressional District', 'New York', '{"representative": ""}'),

-- North Carolina (14 districts)
(NULL, 'NC-01', 'North Carolina 1st Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-02', 'North Carolina 2nd Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-03', 'North Carolina 3rd Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-04', 'North Carolina 4th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-05', 'North Carolina 5th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-06', 'North Carolina 6th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-07', 'North Carolina 7th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-08', 'North Carolina 8th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-09', 'North Carolina 9th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-10', 'North Carolina 10th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-11', 'North Carolina 11th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-12', 'North Carolina 12th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-13', 'North Carolina 13th Congressional District', 'North Carolina', '{"representative": ""}'),
(NULL, 'NC-14', 'North Carolina 14th Congressional District', 'North Carolina', '{"representative": ""}'),

-- North Dakota (1 district - at-large)
(NULL, 'ND-AL', 'North Dakota At-Large Congressional District', 'North Dakota', '{"representative": ""}'),

-- Ohio (15 districts)
(NULL, 'OH-01', 'Ohio 1st Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-02', 'Ohio 2nd Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-03', 'Ohio 3rd Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-04', 'Ohio 4th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-05', 'Ohio 5th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-06', 'Ohio 6th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-07', 'Ohio 7th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-08', 'Ohio 8th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-09', 'Ohio 9th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-10', 'Ohio 10th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-11', 'Ohio 11th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-12', 'Ohio 12th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-13', 'Ohio 13th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-14', 'Ohio 14th Congressional District', 'Ohio', '{"representative": ""}'),
(NULL, 'OH-15', 'Ohio 15th Congressional District', 'Ohio', '{"representative": ""}'),

-- Oklahoma (5 districts)
(NULL, 'OK-01', 'Oklahoma 1st Congressional District', 'Oklahoma', '{"representative": ""}'),
(NULL, 'OK-02', 'Oklahoma 2nd Congressional District', 'Oklahoma', '{"representative": ""}'),
(NULL, 'OK-03', 'Oklahoma 3rd Congressional District', 'Oklahoma', '{"representative": ""}'),
(NULL, 'OK-04', 'Oklahoma 4th Congressional District', 'Oklahoma', '{"representative": ""}'),
(NULL, 'OK-05', 'Oklahoma 5th Congressional District', 'Oklahoma', '{"representative": ""}'),

-- Oregon (6 districts)
(NULL, 'OR-01', 'Oregon 1st Congressional District', 'Oregon', '{"representative": ""}'),
(NULL, 'OR-02', 'Oregon 2nd Congressional District', 'Oregon', '{"representative": ""}'),
(NULL, 'OR-03', 'Oregon 3rd Congressional District', 'Oregon', '{"representative": ""}'),
(NULL, 'OR-04', 'Oregon 4th Congressional District', 'Oregon', '{"representative": ""}'),
(NULL, 'OR-05', 'Oregon 5th Congressional District', 'Oregon', '{"representative": ""}'),
(NULL, 'OR-06', 'Oregon 6th Congressional District', 'Oregon', '{"representative": ""}'),

-- Pennsylvania (17 districts)
(NULL, 'PA-01', 'Pennsylvania 1st Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-02', 'Pennsylvania 2nd Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-03', 'Pennsylvania 3rd Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-04', 'Pennsylvania 4th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-05', 'Pennsylvania 5th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-06', 'Pennsylvania 6th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-07', 'Pennsylvania 7th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-08', 'Pennsylvania 8th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-09', 'Pennsylvania 9th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-10', 'Pennsylvania 10th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-11', 'Pennsylvania 11th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-12', 'Pennsylvania 12th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-13', 'Pennsylvania 13th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-14', 'Pennsylvania 14th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-15', 'Pennsylvania 15th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-16', 'Pennsylvania 16th Congressional District', 'Pennsylvania', '{"representative": ""}'),
(NULL, 'PA-17', 'Pennsylvania 17th Congressional District', 'Pennsylvania', '{"representative": ""}'),

-- Rhode Island (2 districts)
(NULL, 'RI-01', 'Rhode Island 1st Congressional District', 'Rhode Island', '{"representative": ""}'),
(NULL, 'RI-02', 'Rhode Island 2nd Congressional District', 'Rhode Island', '{"representative": ""}'),

-- South Carolina (7 districts)
(NULL, 'SC-01', 'South Carolina 1st Congressional District', 'South Carolina', '{"representative": ""}'),
(NULL, 'SC-02', 'South Carolina 2nd Congressional District', 'South Carolina', '{"representative": ""}'),
(NULL, 'SC-03', 'South Carolina 3rd Congressional District', 'South Carolina', '{"representative": ""}'),
(NULL, 'SC-04', 'South Carolina 4th Congressional District', 'South Carolina', '{"representative": ""}'),
(NULL, 'SC-05', 'South Carolina 5th Congressional District', 'South Carolina', '{"representative": ""}'),
(NULL, 'SC-06', 'South Carolina 6th Congressional District', 'South Carolina', '{"representative": ""}'),
(NULL, 'SC-07', 'South Carolina 7th Congressional District', 'South Carolina', '{"representative": ""}'),

-- South Dakota (1 district - at-large)
(NULL, 'SD-AL', 'South Dakota At-Large Congressional District', 'South Dakota', '{"representative": ""}'),

-- Tennessee (9 districts)
(NULL, 'TN-01', 'Tennessee 1st Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-02', 'Tennessee 2nd Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-03', 'Tennessee 3rd Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-04', 'Tennessee 4th Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-05', 'Tennessee 5th Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-06', 'Tennessee 6th Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-07', 'Tennessee 7th Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-08', 'Tennessee 8th Congressional District', 'Tennessee', '{"representative": ""}'),
(NULL, 'TN-09', 'Tennessee 9th Congressional District', 'Tennessee', '{"representative": ""}'),

-- Texas (38 districts)
(NULL, 'TX-01', 'Texas 1st Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-02', 'Texas 2nd Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-03', 'Texas 3rd Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-04', 'Texas 4th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-05', 'Texas 5th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-06', 'Texas 6th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-07', 'Texas 7th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-08', 'Texas 8th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-09', 'Texas 9th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-10', 'Texas 10th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-11', 'Texas 11th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-12', 'Texas 12th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-13', 'Texas 13th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-14', 'Texas 14th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-15', 'Texas 15th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-16', 'Texas 16th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-17', 'Texas 17th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-18', 'Texas 18th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-19', 'Texas 19th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-20', 'Texas 20th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-21', 'Texas 21st Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-22', 'Texas 22nd Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-23', 'Texas 23rd Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-24', 'Texas 24th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-25', 'Texas 25th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-26', 'Texas 26th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-27', 'Texas 27th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-28', 'Texas 28th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-29', 'Texas 29th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-30', 'Texas 30th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-31', 'Texas 31st Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-32', 'Texas 32nd Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-33', 'Texas 33rd Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-34', 'Texas 34th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-35', 'Texas 35th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-36', 'Texas 36th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-37', 'Texas 37th Congressional District', 'Texas', '{"representative": ""}'),
(NULL, 'TX-38', 'Texas 38th Congressional District', 'Texas', '{"representative": ""}'),

-- Utah (4 districts)
(NULL, 'UT-01', 'Utah 1st Congressional District', 'Utah', '{"representative": ""}'),
(NULL, 'UT-02', 'Utah 2nd Congressional District', 'Utah', '{"representative": ""}'),
(NULL, 'UT-03', 'Utah 3rd Congressional District', 'Utah', '{"representative": ""}'),
(NULL, 'UT-04', 'Utah 4th Congressional District', 'Utah', '{"representative": ""}'),

-- Vermont (1 district - at-large)
(NULL, 'VT-AL', 'Vermont At-Large Congressional District', 'Vermont', '{"representative": ""}'),

-- Virginia (11 districts)
(NULL, 'VA-01', 'Virginia 1st Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-02', 'Virginia 2nd Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-03', 'Virginia 3rd Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-04', 'Virginia 4th Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-05', 'Virginia 5th Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-06', 'Virginia 6th Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-07', 'Virginia 7th Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-08', 'Virginia 8th Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-09', 'Virginia 9th Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-10', 'Virginia 10th Congressional District', 'Virginia', '{"representative": ""}'),
(NULL, 'VA-11', 'Virginia 11th Congressional District', 'Virginia', '{"representative": ""}'),

-- Washington (10 districts)
(NULL, 'WA-01', 'Washington 1st Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-02', 'Washington 2nd Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-03', 'Washington 3rd Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-04', 'Washington 4th Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-05', 'Washington 5th Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-06', 'Washington 6th Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-07', 'Washington 7th Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-08', 'Washington 8th Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-09', 'Washington 9th Congressional District', 'Washington', '{"representative": ""}'),
(NULL, 'WA-10', 'Washington 10th Congressional District', 'Washington', '{"representative": ""}'),

-- West Virginia (2 districts)
(NULL, 'WV-01', 'West Virginia 1st Congressional District', 'West Virginia', '{"representative": ""}'),
(NULL, 'WV-02', 'West Virginia 2nd Congressional District', 'West Virginia', '{"representative": ""}'),

-- Wisconsin (8 districts)
(NULL, 'WI-01', 'Wisconsin 1st Congressional District', 'Wisconsin', '{"representative": ""}'),
(NULL, 'WI-02', 'Wisconsin 2nd Congressional District', 'Wisconsin', '{"representative": ""}'),
(NULL, 'WI-03', 'Wisconsin 3rd Congressional District', 'Wisconsin', '{"representative": ""}'),
(NULL, 'WI-04', 'Wisconsin 4th Congressional District', 'Wisconsin', '{"representative": ""}'),
(NULL, 'WI-05', 'Wisconsin 5th Congressional District', 'Wisconsin', '{"representative": ""}'),
(NULL, 'WI-06', 'Wisconsin 6th Congressional District', 'Wisconsin', '{"representative": ""}'),
(NULL, 'WI-07', 'Wisconsin 7th Congressional District', 'Wisconsin', '{"representative": ""}'),
(NULL, 'WI-08', 'Wisconsin 8th Congressional District', 'Wisconsin', '{"representative": ""}'),

-- Wyoming (1 district - at-large)
(NULL, 'WY-AL', 'Wyoming At-Large Congressional District', 'Wyoming', '{"representative": ""}');

-- Add index for faster global district lookups
CREATE INDEX IF NOT EXISTS idx_districts_org_null ON districts(organization_id) WHERE organization_id IS NULL;
