const path = require('path')
const { oneLine } = require('common-tags')
const { parsePagesDirectory } = require('../src/directory-parser')

test('empty directory', () => {
  const { routes } = parsePagesDirectory('tests/scenarios/empty')
  expect(routes).toEqual([])
})

test('directory with a single file', () => {
  const dir = 'tests/scenarios/single-file'
  const { routes } = parsePagesDirectory(dir)
  expect(routes).toEqual([
    `{ name: 'home', path: '/home', component: () => import('/${dir}/home.vue') }`,
  ])
})

test('directory with multiple files', () => {
  const dir = 'tests/scenarios/single-level-multiple-files'
  const { routes } = parsePagesDirectory(dir)

  expect(routes).toEqual([
    `{ name: 'about', path: '/about', component: () => import('/${dir}/about.vue') }`,
    `{ name: 'home', path: '/home', component: () => import('/${dir}/home.vue') }`,
  ])
})

test('directory with an index file', () => {
  const dir = 'tests/scenarios/with-an-index'
  const { routes } = parsePagesDirectory(dir)

  expect(routes).toEqual([
    `{ name: 'about', path: '/about', component: () => import('/${dir}/about.vue') }`,
    `{ name: 'index', path: '/', component: () => import('/${dir}/index.vue') }`,
  ])
})

test('directory with a little nesting', () => {
  const dir = 'tests/scenarios/with-a-little-nesting'
  const { routes } = parsePagesDirectory(dir)

  expect(routes).toEqual([
    `{ name: 'contact', path: '/contact', component: () => import('/${dir}/contact.vue') }`,
    `{ name: 'index', path: '/', component: () => import('/${dir}/index.vue') }`,
    `{ name: 'level1-about', path: '/level1/about', component: () => import('/${dir}/level1/about.vue') }`,
    `{ name: 'level1-team', path: '/level1/team', component: () => import('/${dir}/level1/team.vue') }`,
    `{ name: 'level1-level2-deep', path: '/level1/level2/deep', component: () => import('/${dir}/level1/level2/deep.vue') }`,
    `{ name: 'level1-level2', path: '/level1/level2/', component: () => import('/${dir}/level1/level2/index.vue') }`,
  ])
})

test('directory with child components', () => {
  const dir = 'tests/scenarios/with-some-child-components'
  const { routes } = parsePagesDirectory(dir)

  expect(routes).toEqual([
    `{ name: 'about', path: '/about', component: () => import('/${dir}/about.vue') }`,
    oneLine`{
      path: '/contact',
      component: () => import('/${dir}/contact.vue'),
      children: [
        { name: 'contact-feedback', path: 'feedback', component: () => import('/${dir}/contact/feedback.vue') },
        { name: 'contact-help', path: 'help', component: () => import('/${dir}/contact/help.vue') },
        { name: 'contact', path: '', component: () => import('/${dir}/contact/index.vue') }
      ]
    }`,
  ])
})

test('directory with some params', () => {
  const dir = 'tests/scenarios/with-some-params'
  const { routes } = parsePagesDirectory(dir)

  expect(routes).toEqual([
    `{ name: 'about', path: '/about', component: () => import('/${dir}/about.vue') }`,
    `{ name: 'product-buy', path: '/:product/buy', component: () => import('/${dir}/_product/buy.vue') }`,
    `{ name: 'product-sell', path: '/:product/sell', component: () => import('/${dir}/_product/sell.vue') }`,
    `{ name: 'team-name', path: '/team/:name', component: () => import('/${dir}/team/_name.vue') }`,
    `{ name: 'team-join', path: '/team/join', component: () => import('/${dir}/team/join.vue') }`,
  ])
})

test('directory with everything', () => {
  const dir = 'tests/scenarios/with-everything'
  const { routes } = parsePagesDirectory(dir)

  expect(routes).toEqual([
    oneLine`{
      path: '/:product',
      component: () => import('/${dir}/_product.vue'),
      children: [
        { name: 'product-buy', path: 'buy', component: () => import('/${dir}/_product/buy.vue') },
        { name: 'product', path: '', component: () => import('/${dir}/_product/index.vue') },
        { name: 'product-sell', path: 'sell', component: () => import('/${dir}/_product/sell.vue') }
      ]
    }`,
    `{ name: 'about', path: '/about', component: () => import('/${dir}/about.vue') }`,
    oneLine`{
      name: 'contact',
      path: '/contact',
      component: () => import('/${dir}/contact.vue'),
      children: [
        { name: 'contact-feedback', path: 'feedback', component: () => import('/${dir}/contact/feedback.vue') },
        { name: 'contact-help', path: 'help', component: () => import('/${dir}/contact/help.vue') }
      ]
    }`,
    `{ name: 'index', path: '/', component: () => import('/${dir}/index.vue') }`,
  ])
})
