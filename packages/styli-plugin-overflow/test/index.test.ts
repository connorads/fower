import { Atom } from '@styli/atom'
import plugin from '../src'

describe('styli-plugin-overflow', () => {
  const { isMatch, onAtomStyleCreate } = plugin()
  const parser = {} as any

  it('isMatch', () => {
    expect(isMatch!('overflow')).toEqual(true)
    expect(isMatch!('overflowX')).toEqual(true)
  })

  it('onAtomStyleCreate', () => {
    const atom1 = new Atom({
      propKey: 'overflow',
      propValue: 'scroll',
      key: 'overflow',
      type: 'style',
      style: {},
    })
    const newAtom1 = new Atom({
      propKey: 'overflow',
      propValue: 'scroll',
      style: { overflow: 'scroll' },
      key: 'overflow',
      type: 'style',
    })
    expect(onAtomStyleCreate!(atom1, parser)).toMatchObject(newAtom1)

    const atom2 = new Atom({
      propKey: 'overflowX',
      propValue: 'scroll',
      key: 'overflowX',
      type: 'style',
      style: {},
    })
    const newAtom2 = new Atom({
      propKey: 'overflowX',
      propValue: 'scroll',
      style: { overflowX: 'scroll' },
      key: 'overflowX',
      type: 'style',
    })
    expect(onAtomStyleCreate!(atom2, parser)).toMatchObject(newAtom2)
  })
})
