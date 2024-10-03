const mongoose = require('mongoose');
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const { totalLikes, favoriteBlog } = require('../utils/list_helper'); // Adjust path as necessary

describe('List Helper', () => {
  it('should calculate total likes', () => {
    const blogs = [
      { likes: 5 },
      { likes: 10 },
    ];
    expect(totalLikes(blogs)).toBe(15);
  });

  it('should return null for an empty list', () => {
    expect(favoriteBlog([])).toBe(null);
  });
});

// Dummy test
test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

// Total likes test  
describe('total likes', () => {
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

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})

// New tests for favorite blog
describe('favorite blog', () => {
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
            _id: '5a422aa71b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'https://blog.cleancoder.com/uncle-bob/2019/04/01/FirstClassTests.html',
            likes: 10,
            __v: 0
        }
    ]

    test('finds the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        const expected = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }

        assert.deepStrictEqual(result, expected)
    })

    test('returns null for an empty list', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })
})

afterAll(async () => {
    await mongoose.connection.close();
  });
  
