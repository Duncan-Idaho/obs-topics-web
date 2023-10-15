import { type  MaybeRefOrGetter, computed, toValue, isRef, type ComputedRef } from "vue"

const DEFAULT_FORMAT = /* #__PURE__ */ '-D.hh:mm:ss.zzz'


export interface UseDurationFormatOptions {
  /**
   * The combination of tokens to format the duration
   * 
   * @default '-D.hh:mm:ss.zzz'
   */
  format?: MaybeRefOrGetter<string>

  /**
   * The string to return if the duration is equal to 0
   */
  equalString?: MaybeRefOrGetter<string>

  /**
   * The combination of tokens to format the duration if it is lower than 0
   */
  pastformat?: MaybeRefOrGetter<string>
}

/**
 * Get the formatted duration according to the string of tokens passed in.
 *
 * @param duration - The duration to format as a number of milliseconds
 * @param formatString - The combination of tokens to format the date
 */
export function useDurationFormat(
  duration: MaybeRefOrGetter<number>, 
  options?: MaybeRefOrGetter<string> | UseDurationFormatOptions
): ComputedRef<string> {
  const normalizedOptions = isRef(options) || typeof options !== "object"
    ? options = { format: options }
    : options

  return computed(() => {
    const durationValue = toValue(duration)

    if (durationValue === 0 && normalizedOptions?.equalString)
      return toValue(normalizedOptions.equalString)

    const format = durationValue >= 0
      ? normalizedOptions?.format
      : normalizedOptions?.pastformat ?? normalizedOptions?.format

    return formatDuration(toValue(duration), toValue(format) ?? DEFAULT_FORMAT)
  })
}

const REGEX_FORMAT = /* #__PURE__ */ /\[([^\]]+)]|Z+|z+|S+|s+|M+|m+|H+|h+|D+|d+|-/g

export function formatDuration(duration: number, formatString: string) {
  const absoluteDuration = Math.abs(duration)
  const matches: Record<string, () => number> = {
    D: () => Math.trunc(absoluteDuration / 86_400_000),
    d: () => Math.trunc(absoluteDuration / 86_400_000),
    H: () => Math.trunc(absoluteDuration / 3600_000),
    h: () => Math.trunc(absoluteDuration / 3600_000) % 24,
    M: () => Math.trunc(absoluteDuration / 60_000),
    m: () => Math.trunc(absoluteDuration / 60_000) % 60,
    S: () => Math.trunc(absoluteDuration / 1000),
    s: () => Math.trunc(absoluteDuration / 1000) % 60,
    Z: () => absoluteDuration,
    z: () => absoluteDuration % 1000
  }
  function applyMatch(token: string) {
    if (token === '-')
      return duration < 0 ? '-' : ''
    return matches[token[0]]?.().toString().padStart(token.length, "0")
  }
  return formatString.replace(REGEX_FORMAT, (match, $1) => $1 ?? applyMatch(match) ?? match)
}

export type UseDateFormatReturn = ReturnType<typeof useDurationFormat>
