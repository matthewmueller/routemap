# Routemap

Simple resolver for paths

## Installation

```
yarn add routemap
```

## Example

```js
const route = Route({
  '/:user': '/user?hello=1',
  '/': '/landing'
})
assert.equal(route('/matt'), '/user?hello=1')
assert.equal(route('/matt?cool=hi'), '/user?cool=hi&hello=1')
```

## TODO

 - [ ] Support accessing the resolved parameters

    `[ '/user?hello=1', { user: 'matt' } ] = route.match('/matt')`

## License

mit
