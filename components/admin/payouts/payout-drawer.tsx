'use client'

import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Send, Mail, MapPin, Calendar, DollarSign, AlertCircle } from 'lucide-react'
import type { Payout } from './payout-table'

interface PayoutDrawerProps {
  payout: Payout | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSend: (id: string) => void
}

export function PayoutDrawer({ payout, open, onOpenChange, onSend }: PayoutDrawerProps) {
  if (!payout) return null

  const getStatusBadge = (status: Payout['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
      case 'sent':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Sent</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Payout Details</SheetTitle>
          <SheetDescription>
            View payout information and respondent details
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status and amount */}
          <div className="flex items-center justify-between">
            {getStatusBadge(payout.status)}
            <span className="text-2xl font-bold">${payout.amount.toFixed(2)}</span>
          </div>

          {/* Error message if failed */}
          {payout.status === 'failed' && payout.error_message && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Error</span>
              </div>
              <p className="mt-1">{payout.error_message}</p>
            </div>
          )}

          <Separator />

          {/* Recipient info */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Recipient</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{payout.recipient_email}</span>
              </div>
              {payout.respondent?.zip_code && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ZIP: {payout.respondent.zip_code}</span>
                </div>
              )}
              {payout.respondent?.district && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">District: {payout.respondent.district.code}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Campaign info */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Campaign</h4>
            <p className="text-sm">{payout.campaign?.name || 'Unknown campaign'}</p>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Created</p>
                  <p>{format(new Date(payout.created_at), 'MMM d, yyyy h:mm a')}</p>
                </div>
              </div>
              {payout.sent_at && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">Sent</p>
                    <p>{format(new Date(payout.sent_at), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {(payout.status === 'pending' || payout.status === 'failed') && (
            <>
              <Separator />
              <Button
                className="w-full"
                onClick={() => {
                  onSend(payout.id)
                  onOpenChange(false)
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                {payout.status === 'pending' ? 'Send Now' : 'Retry Send'}
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
