export const jsonToFormData = (jsonObject: Record<string, any>): FormData => {
  const formData = new FormData()

  const appendFormData = (data: any, parentKey?: string) => {
    if (data && typeof data === 'object' && !(data instanceof File)) {
      if (data instanceof Date) {
        formData.append(parentKey!, data.toISOString())
      } else {
        Object.keys(data).forEach((key) => {
          appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key)
        })
      }
    } else {
      if (data instanceof File) {
        formData.append(parentKey!, data)
      } else {
        const value = data == null ? '' : data
        formData.append(parentKey!, value)
      }
    }
  }

  appendFormData(jsonObject)
  return formData
}

export const isObject = (variable: unknown): boolean => {
  return variable !== null && typeof variable === 'object' && !Array.isArray(variable)
}
