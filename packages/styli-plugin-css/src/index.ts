import hash from 'string-hash'
import { Plugin } from '@styli/core'
import { kebab } from '@styli/utils'

// TODO: need refactor
export default (): Plugin => {
  return {
    onVisitProp({ propKey, propValue }, rule) {
      if (!['css', 'debug'].includes(propKey)) return

      const debug = propKey === 'debug'
      const value = {
        ...propValue,
        ...(debug ? { border: '1px solid gray', div: { border: '1px solid gray' } } : {}),
      }

      const className = propKey === 'debug' ? 'debug' : `css-${hash(JSON.stringify(value))}`

      const list = parseCssProp(className, value)

      rule.cssFragmentWithSelector = list.reduce((result: string, { key, value }: any) => {
        let str = ''
        for (let i in value) {
          str = `${str}${[i]}: ${value[i]};`
        }
        return result + `${key}{${str}}`
      }, '')

      return rule
    },
  }
}

// pseudo-class pseudo-element should connect selector string directly
const getPrefix = (v: string) => (/^::?.*/.test(v) ? '' : ' ')

function getPlainObjectPaths(object: any): any {
  return (
    object &&
    typeof object === 'object' &&
    Object.keys(object).reduce(
      (p, k) =>
        (getPlainObjectPaths(object[k]) || [[]]).reduce((r: any, a: any) => [...r, [k, ...a]], p),
      [],
    )
  )
}

function parseCssProp(className: string, value: any) {
  return getPlainObjectPaths(value).reduce((result: any, path: string[]) => {
    const attrValue = path.reduce((obj: any, c: string) => obj[c], value)
    const attr = kebab('' + path.pop())

    // get selector
    const str = path.reduce((result, value) => `${result}${getPrefix(value)}${value}`, '')

    // create obj for merge same selector
    const obj = {
      key: `.${className}${getPrefix(str)}${str}`,
      value: { [attr]: attrValue },
    }

    const idx = result.findIndex((a: any) => a.key === obj.key)
    if (idx === -1) {
      result = result.concat(obj)
    } else {
      const { key, value } = result[idx]
      result[idx] = { key, value: { ...obj.value, ...value } }
    }

    return result
  }, [])
}
