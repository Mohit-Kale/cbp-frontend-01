export function flattenData(data: Record<string, any>, parentKey = '', res: Record<string, any> = {}): Record<string, any> {
  for (const [key, value] of Object.entries(data)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key

    if (Array.isArray(value)) {
      const isPrimitiveArray = value.every((item) => typeof item !== 'object' || item === null)
      res[newKey] = isPrimitiveArray ? value : value
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // 🧠 Detect if this object is "flat" (only primitives/nulls)
      const isFlatObject = Object.values(value).every((v) => typeof v !== 'object' || v === null)

      if (isFlatObject) {
        // Keep object as-is (e.g. location, address)
        res[newKey] = value
      } else {
        // Recursively flatten deeper nested structures
        flattenData(value, newKey, res)
      }
    } else {
      res[newKey] = value
    }
  }

  return res
}
