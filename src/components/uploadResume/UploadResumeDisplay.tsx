'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { truncateString } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'

interface Props {
  file?: File
  fileUrl?: string
  onRemove: () => void
}

export default function UploadedResumeDisplay({ file, fileUrl, onRemove }: Props) {
  const isLarge = useMediaQuery('(min-width: 728px)')

  const displayName = file ? file.name : fileUrl ? fileUrl.split('\\').pop()?.split('/').pop() : ''

  const displayType = file ? file.type.split('/')[1]?.toUpperCase() : 'PDF'

  const pdfUrl = file ? URL.createObjectURL(file) : fileUrl || ''

  return (
    <div className="border border-border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{isLarge ? displayName : truncateString(displayName || '', 20)}</p>
          {file && <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>}
        </div>
        <Badge variant="secondary" className="text-xs">
          {displayType}
        </Badge>
      </div>

      <div className="flex justify-end gap-3">
        {pdfUrl && (
          <Button asChild type="button" variant="outline" size="sm" className="text-primary hover:text-primary border-primary/30 hover:bg-primary/10 hover:border-primary">
            <Link href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Open PDF
            </Link>
          </Button>
        )}
        <Button type="button" variant="outline" size="sm" onClick={onRemove} className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive hover:border-destructive">
          <X className="w-4 h-4 mr-1" /> Remove
        </Button>
      </div>
    </div>
  )
}
