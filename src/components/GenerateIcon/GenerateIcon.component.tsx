'use client'

import type { LucideProps } from 'lucide-react'
import { DynamicIcon, iconNames } from 'lucide-react/dynamic'

// 👇 Get the union type of all valid icon names
type IconName = (typeof iconNames)[number]

interface IconProps extends LucideProps {
  name: IconName
}

export const GenerateIcon = ({ name, ...props }: IconProps) => {
  return <DynamicIcon name={name} {...props} />
}
