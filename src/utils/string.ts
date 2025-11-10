export const getInitials = (fullName: string) => {
  if (!fullName) return 'U'

  const parts = fullName.trim().split(' ').filter(Boolean)

  if (parts.length === 1) {
    return parts[0][0].toUpperCase()
  }

  const firstInitial = parts[0][0].toUpperCase()
  const lastInitial = parts[parts.length - 1][0].toUpperCase()

  return `${firstInitial}${lastInitial}`
}

export function toTitleCase(str: string): string {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export function truncateString(input: unknown, maxLength: number): string {
  try {
    if (typeof input !== 'string') {
      console.warn('truncateString() warning: input is not a string')
      return ''
    }

    if (typeof maxLength !== 'number' || maxLength <= 0) {
      console.warn('truncateString() warning: maxLength must be a positive number')
      return input
    }

    if (input.length <= maxLength) return input

    return input.slice(0, maxLength).trimEnd() + '...'
  } catch (error) {
    console.error('truncateString() error:', error)
    return ''
  }
}

export function getHeadingFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean)

  if (segments.length < 2) return ''

  const adminIndex = segments.indexOf('admin')

  // Ensure "admin" exists and has a segment after it
  if (adminIndex !== -1 && segments.length > adminIndex + 1) {
    const targetSegment = segments[adminIndex + 1]
    return targetSegment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return ''
}
