import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const acceptedTypes = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'feature',
  'fix',
  'bugfix',
  'opt',
  'merge',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
]

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', acceptedTypes],
    'type-case': [RuleConfigSeverity.Error, 'always', ['lower-case']]
  },
  helpUrl: '\n\thttps://commitlint.js.org/\n\thttps://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  ignores: [
    (commit) => {
      const mergeReg = /^Merge branch '(.*?)' into '(.*?)'$/
      const match = commit.match(mergeReg)
      return match ? true : false
    }
  ]
}

module.exports = Configuration
