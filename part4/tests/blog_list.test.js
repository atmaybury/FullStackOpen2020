const listHelper = require('../utils/blog_list_test_helper')

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.listWithManyBlogs)
    expect(result).toBe(36)
  })
  
})

describe('favourite blog', () => {
  test('returns correctly', () => {
    result = listHelper.favoriteBlog(listHelper.listWithManyBlogs).likes
    expect(result).toEqual(12)
  })
})
