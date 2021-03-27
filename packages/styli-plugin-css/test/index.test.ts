import { CSSObject, ParserType } from '@styli/types'
import { Atom } from '@styli/atom'
import plugin from '../src'

describe('styli-plugin-css', () => {
  const { isMatch, onAtomStyleCreate } = plugin()
  const parser = {} as ParserType

  it('isMatch', () => {
    expect(isMatch!('css')).toEqual(true)
    expect(isMatch!('acss')).toEqual(false)
    expect(isMatch!('cssb')).toEqual(false)
  })

  it('onAtomStyleCreate', () => {
    const value: CSSObject = {
      border: '1px solid red',
      ':hover': {
        color: 'yellow',
      },
    }

    const atom = new Atom({
      key: 'css',
      propKey: 'css',
      propValue: value,
      style: {},
      type: 'prefix',
    })

    const newAtom = new Atom({
      key: 'css',
      propKey: 'css',
      propValue: value,
      style: value,
      type: 'prefix',
    })

    expect(onAtomStyleCreate!(atom, parser)).toMatchObject(newAtom)
  })
})
