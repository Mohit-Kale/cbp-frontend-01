'use client'

import { useState } from 'react'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

export default function TimezoneDropdown() {
  const [userTimeZone, setUserTimeZone] = useState<string>('Europe/London') // UK default

  return (
    <div className="w-full max-w-sm">
      <Select value={userTimeZone} onValueChange={(val) => setUserTimeZone(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select timezone" />
        </SelectTrigger>

        <SelectContent>
          {/* UK */}
          <SelectItem value="Europe/London">Europe / London (UK)</SelectItem>

          {/* USA – common zones */}
          <SelectItem value="America/New_York">America / New York (EST)</SelectItem>
          <SelectItem value="America/Chicago">America / Chicago (CST)</SelectItem>
          <SelectItem value="America/Denver">America / Denver (MST)</SelectItem>
          <SelectItem value="America/Los_Angeles">America / Los Angeles (PST)</SelectItem>

          {/* Europe */}
          <SelectItem value="Europe/Berlin">Europe / Berlin (CET)</SelectItem>
          <SelectItem value="Europe/Paris">Europe / Paris (CET)</SelectItem>
          <SelectItem value="Europe/Madrid">Europe / Madrid (CET)</SelectItem>
          <SelectItem value="Europe/Rome">Europe / Rome (CET)</SelectItem>

          {/* India */}
          <SelectItem value="Asia/Kolkata">Asia / Kolkata (IST)</SelectItem>

          {/* Middle East */}
          <SelectItem value="Asia/Dubai">Asia / Dubai (GST)</SelectItem>

          {/* Asia – popular */}
          <SelectItem value="Asia/Singapore">Asia / Singapore</SelectItem>
          <SelectItem value="Asia/Hong_Kong">Asia / Hong Kong</SelectItem>
          <SelectItem value="Asia/Tokyo">Asia / Tokyo (JST)</SelectItem>

          {/* Australia */}
          <SelectItem value="Australia/Sydney">Australia / Sydney</SelectItem>

          {/* Universal */}
          <SelectItem value="UTC">UTC</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
