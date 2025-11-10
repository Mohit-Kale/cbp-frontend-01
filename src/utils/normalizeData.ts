export function normalizeNullArrays(data: Record<string, any>) {
  if (!data || typeof data !== 'object') return data
  const arrayLikePattern = /(projects?|skills?|education|experiences?|languages?)/i

  const normalized: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    if (value === null && arrayLikePattern.test(key)) {
      normalized[key] = []
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      normalized[key] = normalizeNullArrays(value)
    } else {
      normalized[key] = value
    }
  }
  return normalized
}

export function normalizeData(obj: Record<string, any>): Record<string, any> {
  if (!obj || typeof obj !== 'object') return obj

  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    // Skip empty or undefined values
    if (value === null || value === undefined || value === '') continue

    // Recursively normalize nested objects
    if (typeof value === 'object' && !Array.isArray(value)) {
      const normalizedChild = normalizeData(value)
      if (Object.keys(normalizedChild).length > 0) {
        result[key] = normalizedChild
      }
      continue
    }

    // Handle arrays
    if (Array.isArray(value)) {
      const cleanedArray = value.map((v) => (typeof v === 'object' ? normalizeData(v) : v)).filter((v) => v !== null && v !== undefined && v !== '')

      if (cleanedArray.length > 0) {
        result[key] = cleanedArray
      }
      continue
    }

    // Trim strings
    if (typeof value === 'string') {
      result[key] = value.trim()
      continue
    }

    result[key] = value
  }

  return result
}
