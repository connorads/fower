import { ModifierType, Plugin, styli, getValue } from '@styli/core'
import { kebab, isNumber, upFirst } from '@styli/utils'

export const G = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
}

export const positionMaps: any = {
  t: G.top,
  l: G.left,
  r: G.right,
  b: G.bottom,
}

export const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'none']

// TODO: need refactor
export function isBorderKey(key: string) {
  return key.startsWith('border')
}

export default (): Plugin => {
  return {
    onVisitProp({ propKey }, rule) {
      if (!isBorderKey(propKey)) return

      let style: any = {}

      let [, second, third] = kebab(propKey).split('-')
      const Colors = styli.getColors()
      const isBorderColor = (val: string) => !!Colors[val as any]
      const isBorderStyle = (val: string) => borderStyles.includes(val)
      const isBorderPosition = (val: string) => !!positionMaps[val]
      const isBorderWidth = (val: string) => isNumber(val)

      if (isBorderWidth(second) || isBorderWidth(third)) {
        const position = isBorderPosition(second) ? upFirst(positionMaps[second]) : ''
        style[`border${position}Width`] = getValue(third || second, ModifierType.border)
        style[`border${position}Style`] = 'solid'
      }
      if (isBorderColor(second)) {
        style.borderColor = Colors[second as any]
      }
      if (isBorderStyle(second)) {
        style.borderStyle = second
      }

      rule.style = style
      rule.cssFragment = Object.keys(style).reduce((t, c) => `${t}${kebab(c)}:${style[c]};`, '')

      return rule
    },
  }
}
