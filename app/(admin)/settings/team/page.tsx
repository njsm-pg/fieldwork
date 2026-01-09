'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Loader2,
  UserPlus,
  MoreHorizontal,
  Mail,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Users,
} from 'lucide-react'

interface TeamMember {
  id: string
  email: string
  full_name: string | null
  role: 'admin' | 'editor' | 'viewer'
  created_at: string
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'editor' | 'viewer'>('viewer')
  const [inviting, setInviting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    fetchTeam()
  }, [])

  async function fetchTeam() {
    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setCurrentUserId(user.id)

    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('id', user.id)
      .single()

    if (!userData?.organization_id) {
      setLoading(false)
      return
    }

    const { data: members } = await supabase
      .from('users')
      .select('id, email, full_name, role, created_at')
      .eq('organization_id', userData.organization_id)
      .order('created_at')

    if (members) {
      setMembers(members as TeamMember[])
    }

    setLoading(false)
  }

  async function handleInvite() {
    if (!inviteEmail) return

    setInviting(true)
    setError(null)
    setSuccess(null)

    try {
      // In a real app, this would send an invitation email
      // For now, we'll just show a success message
      // The invited user would need to sign up and be added to the organization

      setSuccess(`Invitation sent to ${inviteEmail}`)
      setInviteEmail('')
      setInviteDialogOpen(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setInviting(false)
    }
  }

  async function handleChangeRole(userId: string, newRole: 'admin' | 'editor' | 'viewer') {
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error

      setMembers(members.map(m =>
        m.id === userId ? { ...m, role: newRole } : m
      ))
      setSuccess('Role updated successfully')
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function handleRemoveMember(userId: string) {
    if (userId === currentUserId) {
      setError("You can't remove yourself")
      return
    }

    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      // Remove user from organization (set org_id to null)
      const { error } = await supabase
        .from('users')
        .update({ organization_id: null })
        .eq('id', userId)

      if (error) throw error

      setMembers(members.filter(m => m.id !== userId))
      setSuccess('Team member removed')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const getRoleBadge = (role: TeamMember['role']) => {
    switch (role) {
      case 'admin':
        return <Badge>Admin</Badge>
      case 'editor':
        return <Badge variant="secondary">Editor</Badge>
      case 'viewer':
        return <Badge variant="outline">Viewer</Badge>
    }
  }

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return email.slice(0, 2).toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage team members and their permissions
          </p>
        </div>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">Email address</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inviteRole">Role</Label>
                <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin - Full access</SelectItem>
                    <SelectItem value="editor">Editor - Can edit campaigns</SelectItem>
                    <SelectItem value="viewer">Viewer - Read only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={inviting || !inviteEmail}>
                {inviting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Mail className="mr-2 h-4 w-4" />
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Team list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <CardDescription>
            {members.length} member{members.length !== 1 && 's'} in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(member.full_name, member.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {member.full_name || member.email}
                          {member.id === currentUserId && (
                            <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                          )}
                        </p>
                        {member.full_name && (
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={member.role}
                      onValueChange={(v) => handleChangeRole(member.id, v as any)}
                      disabled={member.id === currentUserId}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {member.id !== currentUserId && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">Admin</p>
              <p className="text-muted-foreground">
                Full access to all features including team management, billing, and settings
              </p>
            </div>
            <div>
              <p className="font-medium">Editor</p>
              <p className="text-muted-foreground">
                Can create and edit campaigns, view payouts, and manage respondents
              </p>
            </div>
            <div>
              <p className="font-medium">Viewer</p>
              <p className="text-muted-foreground">
                Read-only access to campaigns and reports
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
