import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStore } from '../utils'

const { Setable } = StateDefinitions

describe('definition - setable', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      expect(() => defineState({
        space: Setable
      })).to.throw('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: Setable
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo).to.equal(undefined)
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: Setable
        }
      })
      const store = makeStore()

      global.Space.foo.set('foo')

      expect(store.getState().space.foo).to.equal('foo')
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: {
            bar: Setable
          }
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo.bar).to.equal(undefined)
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: {
            bar: Setable
          }
        }
      })
      const store = makeStore()

      global.Space.foo.bar.set('foo')
      expect(store.getState().space.foo.bar).to.equal('foo')
    })
  })
})
