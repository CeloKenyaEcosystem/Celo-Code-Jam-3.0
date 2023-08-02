function isStale(lastUpdated, staleTime) {
  return !lastUpdated || Date.now() - lastUpdated > staleTime
}

function areDatesSameDay(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}

function getDaysBetween(timestamp1, timestamp2) {
  return Math.round((timestamp2 - timestamp1) / (1000 * 60 * 60 * 24))
}

module.exports = {
  isStale, areDatesSameDay, getDaysBetween
}