import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/sidebar'
import { TopBar } from '@/components/admin/top-bar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          user={{
            email: user.email || '',
            full_name: profile?.full_name,
            avatar_url: profile?.avatar_url,
          }}
        />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
