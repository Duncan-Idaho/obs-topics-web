import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TopicsList from '../TopicsList.vue'

describe('TopicsList', () => {
  it('display each columns in header plus actions', () => {
    const wrapper = mount(TopicsList, { props: { 
      columns: ['Team', 'Order'],
      modelValue: [
        { Team: "Falcon", Order: 12 },
        { Team: "Antares", Order: 42, SomeOtherField: "Plop" },
      ] 
    } })
    expect(wrapper.findAll("th")).toHaveLength(3)
    expect(wrapper.findAll("th")[0].text()).toBe("Actions")
    expect(wrapper.findAll("th")[1].text()).toBe("Team")
    expect(wrapper.findAll("th")[2].text()).toBe("Order")
  })

  it('display each topics in same order than header', () => {
    const wrapper = mount(TopicsList, { props: { 
      columns: ['Team', 'Order'],
      modelValue: [
        { Team: "Falcon", Order: 12 },
        { Order: 42, Team: "Antares", SomeOtherField: "Plop" },
      ] 
    } })
    expect(wrapper.findAll("tbody tr")).toHaveLength(2)

    expect(wrapper.findAll("tr:nth-child(1) > td")).toHaveLength(3)
    expect(wrapper.find<HTMLInputElement>("tr:nth-child(1) > td:nth-child(2) input").element.value).toBe("Falcon")
    expect(wrapper.find<HTMLInputElement>("tr:nth-child(1) > td:nth-child(3) input").element.value).toBe("12")

    expect(wrapper.findAll("tr:nth-child(2) > td")).toHaveLength(3)
    expect(wrapper.find<HTMLInputElement>("tr:nth-child(2) > td:nth-child(2) input").element.value).toBe("Antares")
    expect(wrapper.find<HTMLInputElement>("tr:nth-child(2) > td:nth-child(3) input").element.value).toBe("42")
  })
})
