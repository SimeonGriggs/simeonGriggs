// If we're using hashes to scroll to it can be problematic if the id starts with a number
export function scrollableKey(key: string) {
  return `s-${key}`
}
