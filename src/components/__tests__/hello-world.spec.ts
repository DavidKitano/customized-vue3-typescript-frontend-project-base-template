import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../common/hello-world.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const msgTest = {
      version: new Date(''),
      versionText: '这只是一个测试',
      welcomeText: '我就问我就问，我到底要怎么做你们才能放过我'
    }
    const wrapper = mount(HelloWorld, { props: { msg: msgTest } })
    expect(wrapper.text()).toContain('我就问我就问，我到底要怎么做你们才能放过我')
    expect(wrapper.text()).toContain('这只是一个测试')
  })
})
