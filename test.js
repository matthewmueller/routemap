/* global describe, it */

const assert = require('assert')
const Route = require('./')

describe('routemap', function () {
  it('should work', function () {
    const route = Route({ '/': '/landing' })
    assert.equal(route('/'), '/landing')
    assert.equal(route('/?hi=cool&whatever=lol'), '/landing?hi=cool&whatever=lol')
  })

  it('should work with static query params', function () {
    const route = Route({ '/': '/landing?hello=1' })
    assert.equal(route('/'), '/landing?hello=1')
    assert.equal(route('/?hi=cool&whatever=lol'), '/landing?hello=1&hi=cool&whatever=lol')
  })
})
