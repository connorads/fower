import { Atom, styli } from '@styli/core'
import plugin from '../src'

describe('styli-plugin-shadow', () => {
  styli.setup({
    theme: {
      shadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      },
    } as any,
  })

  const { isMatch, onVisitProp } = plugin()
  const sheet = {} as any
  it('isMatch', () => {
    expect(isMatch!('shadow')).toEqual(true)
    expect(isMatch!('shadowXS')).toEqual(true)
  })

  it('onVisitProp', () => {
    const atom1 = { propKey: 'shadow', propValue: '0 0 0 1px rgba(0, 0, 0, 0.05)' } as Atom
    const newAtom1 = {
      propKey: 'shadow',
      propValue: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      style: { boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)' },
    }
    expect(onVisitProp!(atom1, sheet)).toMatchObject(newAtom1)

    const atom2 = { propKey: 'shadowXS', propValue: true } as Atom
    const newAtom2 = {
      propKey: 'shadowXS',
      propValue: true,
      style: { boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)' },
    }
    expect(onVisitProp!(atom2, sheet)).toMatchObject(newAtom2)
  })
})