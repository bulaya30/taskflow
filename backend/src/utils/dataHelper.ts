export function cleanUndefined<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined
    )
  )
}