-- ============================================
-- ALLOW ORGANIZATION CREATION
-- ============================================

-- Allow authenticated users to create organizations
CREATE POLICY "Authenticated users can create organizations"
    ON organizations FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow users to update their own organization_id (to link to new org)
-- The existing policy "Users can update their own profile" should handle this,
-- but let's make sure it's explicit
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());
