import type { ObjectDirective } from 'vue'

export const sample: ObjectDirective = {
  mounted(el, binding) {
    console.log(el, binding)
  }
}
