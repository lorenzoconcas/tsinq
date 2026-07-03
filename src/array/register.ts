import { registerPrototypeMethod } from '../register'
import * as aggregation from './aggregation'
import * as conversion from './conversion'
import * as element from './element'
import * as filtering from './filtering'
import * as grouping from './grouping'
import * as modification from './modification'
import * as ordering from './ordering'
import * as partition from './partition'
import * as projection from './projection'
import * as quantifiers from './quantifiers'
import * as random from './random'
import * as set from './set'
import * as utility from './utility'

const modules = [
    filtering,
    projection,
    quantifiers,
    element,
    ordering,
    aggregation,
    set,
    partition,
    grouping,
    conversion,
    modification,
    random,
    utility,
]

for (let i = 0; i < modules.length; i++) {
    const moduleExports = modules[i]

    for (const [name, implementation] of Object.entries(moduleExports)) {
        if (typeof implementation === 'function') {
            registerPrototypeMethod(Array.prototype, name, implementation)
        }
    }
}
