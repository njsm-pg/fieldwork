-- ============================================
-- FIX ORGANIZATION CREATION POLICY
-- ============================================

-- Drop the previous policies
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view their organization" ON organizations;

-- Allow any authenticated user to create an organization
CREATE POLICY "Authenticated users can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow users to view their own organization OR any organization (for setup)
-- This is permissive for SELECT - the real security is on the data inside
CREATE POLICY "Users can view organizations"
    ON organizations FOR SELECT
    USING (auth.uid() IS NOT NULL);
