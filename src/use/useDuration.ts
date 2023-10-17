import { type MaybeRefOrGetter, computed, toValue, type ComputedRef } from "vue"
import { useDurationFormat, type UseDurationFormatOptions } from "./useDurationFormat"

/**
 * Compute and format the duration between the two dates passed in.
 *
 * @param from - The reference date
 * @param to - The date to compare to "from"
 * @param formatString - Either a string format to pass to @see useDurationFormat or to the custome formatter to format
 * @param formatter - Function to use in place of @see useDurationFormat to format
 */
export function useDuration(
  from: MaybeRefOrGetter<Date | Number>, 
  to: MaybeRefOrGetter<Date | Number>,
  options?: UseDurationFormatOptions | ((duration: MaybeRefOrGetter<number>) => ComputedRef<string>)
): ComputedRef<string> {
  const duration = computed(() => toValue(to).valueOf() - toValue(from).valueOf())
  
  return typeof options === "function"
    ? options(duration)
    : useDurationFormat(duration, options)
}
