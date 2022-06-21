/* eslint-disable no-unused-vars */
const dummy = (_blogs) => 1

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return {}
  }

  const max = Math.max(...blogs.map(blog => blog.likes))
  const fav = blogs.find(blog => blog.likes === max)

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}