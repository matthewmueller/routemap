var Regexp = require('path-to-regexp')
var assign = require('object-assign')
var qs = require('query-string')
var URL = require('url')

/**
 * Export `Routemap`
 */

module.exports = Routemap

/**
 * Routemap routes
 */

function Routemap (routes) {
  routes = routes || {}

  var routing = {}
  for (var route in routes) {
    routing[route] = URL.parse(routes[route], true)
  }

  return function routemap (u) {
    var url = URL.parse(u, true)
    var pathname = url.pathname
    var query = url.query
    var params = {}

    for (var route in routes) {
      var m = match(route, params, pathname)
      if (m) {
        var r = routing[route]
        return URL.format(assign(url, {
          pathname: r.pathname,
          search: qs.stringify(assign(query, r.query))
        }))
      }
    }

    return null
  }
}

/**
 * Patch replace
 */

function match (path, params, pathname) {
  var keys = []
  var regexp = Regexp(path, keys)
  var m = regexp.exec(pathname)

  if (!m) return false
  else if (!params) return true

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1]
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
    if (key) params[key.name] = val
  }

  return true
}
