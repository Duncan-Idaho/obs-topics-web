import { describe, it, expect } from 'vitest'
import { useDuration } from '../useDuration'
import { type MaybeRefOrGetter, computed, ref } from 'vue'
import { useDurationFormat } from '../useDurationFormat'

describe("useDuration", () => {
  it("can return milliseconds difference", () => {
    const duration = useDuration(
      new Date(2023, 1, 1, 12, 0, 0, 0),
      new Date(2023, 1, 1, 12, 0, 0, 42),
      { format: "Z" }
    )

    expect(duration.value).toBe("42");
  })

  it("supports references", () => {
    const duration = useDuration(
      ref(new Date(2023, 1, 1, 12, 0, 0, 0)),
      ref(new Date(2023, 1, 1, 12, 0, 0, 42)),
      { format: "Z" },
    )

    expect(duration.value).toBe("42");
  })

  it("updates when references updates", () => {
    const from = ref(new Date(2023, 1, 1, 12, 0, 0, 0));
    const to = ref(new Date(2023, 1, 1, 12, 0, 0, 42));
    const duration = useDuration( from, to, { format: "Z" } )

    expect(duration.value).toBe("42");

    to.value = new Date(2023, 1, 1, 12, 0, 0, 24);
    
    expect(duration.value).toBe("24");

    from.value = new Date(2023, 1, 1, 12, 0, 0, 10);
    
    expect(duration.value).toBe("14");
  })

  it("supports integers in place of date", () => {
    expect(useDuration(
      12,
      42,
      { format: "Z" }
    ).value).toBe("30");

    expect(useDuration(
      ref(16),
      ref(39),
      { format: "Z" }
    ).value).toBe("23");
  })

  it("uses full format by default", () => {
    const duration = useDuration(
      new Date(2023, 1, 1, 12, 17, 0, 0),
      new Date(2023, 1, 20, 18, 16, 17, 42)
    )

    expect(duration.value).toBe("19.05:59:17.042");
  })

  it("can use a custom format string", () => {
    const duration = useDuration(
      new Date(2023, 1, 1, 12, 17, 0, 0),
      new Date(2023, 1, 20, 18, 16, 17, 42),
      { format: "d:h:m:s:z" }
    )

    expect(duration.value).toBe("19:5:59:17:42");
  })

  it("can use a custom format function", () => {
    function format(duration: MaybeRefOrGetter<number>) {
      const formatted = useDurationFormat(duration, "d:h:m:s:z")
      return computed(() => "Remaining: " + formatted.value)
    }

    const duration = useDuration(
      new Date(2023, 1, 1, 12, 17, 0, 0),
      new Date(2023, 1, 20, 18, 16, 17, 42),
      format
    )

    expect(duration.value).toBe("Remaining: 19:5:59:17:42");
  })
})