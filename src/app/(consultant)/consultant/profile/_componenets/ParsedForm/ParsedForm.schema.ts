import { z } from 'zod'

function flattenObject(obj: any, prefix = '', res: Record<string, any> = {}) {
  if (obj == null) return res

  for (const key of Object.keys(obj)) {
    let value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    // 🩵 Treat null values in known array-like fields as empty arrays
    const arrayLikeKeys = ['projects', 'skills', 'languages', 'education', 'work_experience', 'workExperience']
    const keyLower = key.toLowerCase()
    if (value === null && arrayLikeKeys.some((k) => keyLower.includes(k))) {
      value = []
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        res[newKey] = []
      } else if (typeof value[0] === 'object' && value[0] !== null) {
        value.forEach((v, i) => flattenObject(v, `${newKey}[${i}]`, res))
      } else {
        res[newKey] = value
      }
    } else if (typeof value === 'object' && value !== null) {
      flattenObject(value, newKey, res)
    } else {
      res[newKey] = value
    }
  }

  return res
}

export function createDynamicSchema(data: Record<string, any>) {
  const flattened = flattenObject(data)
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const key in flattened) {
    const val = flattened[key]
    const lowerKey = key.toLowerCase()

    // ✅ Only make "summary" required
    if (lowerKey.includes('summary')) {
      shape[key] = z.string({ required_error: 'Summary is required' }).min(10, { message: 'Summary must be at least 10 characters long' })
      continue
    }

    // Everything else is optional
    if (typeof val === 'string') {
      shape[key] = z.string().optional()
    } else if (typeof val === 'number') {
      shape[key] = z.number().optional()
    } else if (typeof val === 'boolean') {
      shape[key] = z.boolean().optional()
    } else if (Array.isArray(val)) {
      if (val.length === 0) {
        shape[key] = z.array(z.any()).optional()
      } else {
        const first = val[0]
        if (typeof first === 'string') {
          shape[key] = z.array(z.string()).optional()
        } else if (typeof first === 'number') {
          shape[key] = z.array(z.number()).optional()
        } else if (typeof first === 'boolean') {
          shape[key] = z.array(z.boolean()).optional()
        } else {
          shape[key] = z.array(z.any()).optional()
        }
      }
    } else {
      shape[key] = z.any().optional()
    }
  }

  return z.object(shape)
}
