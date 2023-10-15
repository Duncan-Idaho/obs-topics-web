import { describe, it, expect } from 'vitest'
import { useDurationFormat } from '../useDurationFormat'
import { ref } from 'vue'

function makeMilliseconds(durationObject: {
  days?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
}) {
  const days = durationObject.days ?? 0
  const hours = (durationObject.hours ?? 0) + days * 24
  const minutes = (durationObject.minutes ?? 0) + hours * 60
  const seconds = (durationObject.seconds ?? 0) + minutes * 60
  return (durationObject.milliseconds ?? 0) + seconds * 1000  
}

describe("useDurationFormat", () => {
  it("can formats to milliseconds", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 999,
      hours: 23,
      minutes: 59,
      seconds: 58,
      milliseconds: 999
    }), "z")

    expect(formatted.value).toBe("999")
  })
  
  it("can format to seconds", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 999,
      hours: 23,
      minutes: 59,
      seconds: 58,
      milliseconds: 999
    }), "s")

    expect(formatted.value).toBe("58")
  })
  
  it("can format to minutes", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 999,
      hours: 23,
      minutes: 59,
      seconds: 58,
      milliseconds: 999
    }), "m")

    expect(formatted.value).toBe("59")
  })
  
  it("can format to hours", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 999,
      hours: 23,
      minutes: 59,
      seconds: 58,
      milliseconds: 999
    }), "h")

    expect(formatted.value).toBe("23")
  })
  
  it("can format to days", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 999,
      hours: 23,
      minutes: 59,
      seconds: 58,
      milliseconds: 999
    }), "d")

    expect(formatted.value).toBe("999")
  })

  it("can formats to total milliseconds", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      seconds: 2,
      milliseconds: 999
    }), "Z")

    expect(formatted.value).toBe("2999")
  })
  
  it("can format to total seconds", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), "S")

    expect(formatted.value).toBe("182")
  })
  
  it("can format to total minutes", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), "M")

    expect(formatted.value).toBe("243")
  })
  
  it("can format to total hours", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), "H")

    expect(formatted.value).toBe("124")
  })
  
  it("can format to total days", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), "D")

    expect(formatted.value).toBe("5")
  })
  
  it("can format complex string with static tokens", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), "d [d]ay[s] h [h]our[s] m [m]inute[s] s [s]econ[ds] z [m]illi[s]econ[ds]")

    expect(formatted.value).toBe("5 days 4 hours 3 minutes 2 seconds 999 milliseconds")
  })
  
  it("can receive format as options", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), { format: "d hh:mm:ss.zzz" })

    expect(formatted.value).toBe("5 04:03:02.999")
  })
  
  it("can format negatives", () => {
    const formatted = useDurationFormat(-makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), "-d [d]ay[s] h [h]our[s] m [m]inute[s] s [s]econ[ds] z [m]illi[s]econ[ds]")

    expect(formatted.value).toBe("-5 days 4 hours 3 minutes 2 seconds 999 milliseconds")
  })
  
  it("can support different format for positives and negatives, and a constant for 0", () => {
    const duration = ref(makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 9
    }))

    const formatted = useDurationFormat(duration, { 
      format: "[it will be in] d [days and] hh:mm:ss.zzz",
      pastformat: "[it was] d [days and] hh:mm:ss [ago]",
      equalString: "it is now"
    })
    expect(formatted.value).toBe("it will be in 5 days and 04:03:02.009")

    duration.value = -duration.value
    expect(formatted.value).toBe("it was 5 days and 04:03:02 ago")

    duration.value = 0
    expect(formatted.value).toBe("it is now")
  })
  
  it("can pad tokens", () => {
    const formatted = useDurationFormat(makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    }), "ddddd:hhhhhh:mmmmmm:ssssss:zzzzzz")

    expect(formatted.value).toBe("00005:000004:000003:000002:000999")
  })
  
  it("supports refs", () => {
    const milliseconds = ref(makeMilliseconds({
      days: 999,
      hours: 23,
      minutes: 59,
      seconds: 58,
      milliseconds: 999
    }))
    const format = ref("d:h:m:s:z")

    const formatted = useDurationFormat(milliseconds, format)
    expect(formatted.value).toBe("999:23:59:58:999")

    milliseconds.value = makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 999
    })
    expect(formatted.value).toBe("5:4:3:2:999")

    format.value = "D:H:M:S:Z"
    expect(formatted.value).toBe("5:124:7443:446582:446582999")
  })
  
  it("formats to full by default", () => {
    const duration = ref(makeMilliseconds({
      days: 5,
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 9
    }))

    const formatted = useDurationFormat(duration)
    expect(formatted.value).toBe("5.04:03:02.009")

    duration.value = -duration.value
    expect(formatted.value).toBe("-5.04:03:02.009")
  })
})
