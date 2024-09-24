const { test } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

// Dummy test
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

// Test for totalLikes with one blog
test('totalLikes when list has only one blog equals the likes of that blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const result = listHelper.totalLikes(listWithOneBlog)
  assert.strictEqual(result, 5)
})

// Test for totalLikes with multiple blogs
test('totalLikes when list has multiple blogs equals the sum of their likes', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://en.wikipedia.org/wiki/Canonical_string_reduction',
      likes: 12,
      __v: 0
    }
  ]

  const result = listHelper.totalLikes(listWithMultipleBlogs)
  assert.strictEqual(result, 24)
})

// Test for totalLikes with an empty list
test('totalLikes when list is empty equals zero', () => {
  const result = listHelper.totalLikes([])
  assert.strictEqual(result, 0)
})
