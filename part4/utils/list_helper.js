/* eslint-disable no-unused-vars */
const dummy = (_blogs) => 1

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}