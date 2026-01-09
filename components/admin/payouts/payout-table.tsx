'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Send, Eye, AlertCircle } from 'lucide-react'

export interface Payout {
  id: string
  amount: number
  recipient_email: string
  status: 'pending' | 'sent' | 'failed'
  created_at: string
  sent_at: string | null
  error_message: string | null
  respondent: {
    id: string
    zip_code: string | null
    district: {
      code: string
    } | null
  } | null
  campaign: {
    id: string
    name: string
  } | null
}

interface PayoutTableProps {
  payouts: Payout[]
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  onSendPayout: (id: string) => void
  onViewDetails: (payout: Payout) => void
}

export function PayoutTable({
  payouts,
  selectedIds,
  onSelectionChange,
  onSendPayout,
  onViewDetails,
}: PayoutTableProps) {
  const selectAll = payouts.length > 0 && payouts.every((p) => selectedIds.has(p.id))
  const selectSome = payouts.some((p) => selectedIds.has(p.id))

  const handleSelectAll = () => {
    if (selectAll) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(payouts.map((p) => p.id)))
    }
  }

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    onSelectionChange(next)
  }

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectAll}
                ref={(el) => {
                  if (el) {
                    (el as any).indeterminate = selectSome && !selectAll
                  }
                }}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>District</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No payouts found.
              </TableCell>
            </TableRow>
          ) : (
            payouts.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.has(payout.id)}
                    onCheckedChange={() => handleSelectOne(payout.id)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{payout.recipient_email}</p>
                    {payout.respondent?.zip_code && (
                      <p className="text-xs text-muted-foreground">
                        ZIP: {payout.respondent.zip_code}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{payout.campaign?.name || '-'}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {payout.respondent?.district?.code || '-'}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${payout.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(payout.status)}
                    {payout.status === 'failed' && payout.error_message && (
                      <span title={payout.error_message}>
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {payout.sent_at
                    ? format(new Date(payout.sent_at), 'MMM d, yyyy')
                    : format(new Date(payout.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(payout)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {payout.status === 'pending' && (
                        <DropdownMenuItem onClick={() => onSendPayout(payout.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Send Now
                        </DropdownMenuItem>
                      )}
                      {payout.status === 'failed' && (
                        <DropdownMenuItem onClick={() => onSendPayout(payout.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Retry
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
