export const isObject = (variable: unknown): boolean => {
  return variable !== null && typeof variable === 'object' && !Array.isArray(variable)
}

export const hasAnyData = (data: any): boolean => {
  if (data === undefined || data === null) return false

  return Object?.values(data)?.some((items) => Array.isArray(items) && items.length > 0)
}
