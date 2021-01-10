/* eslint-disable */
const version = 'v1.0.0'
const filesToCache = [
]
const urlBlacklist = []

function updateStaticCache() {
  return caches.open(version)
    .then(cache => {
      return cache.addAll(filesToCache)
    })
}
const clearOldCaches = () => {
  return caches.keys().then(keys => {
    return Promise.all(
      keys
      .filter(key => key.indexOf(version) !== 0)
      .map(key => caches.delete(key))
    )
  })
}
const isHtmlRequest = (request) => request.headers.get('Accept').indexOf('text/html') !== -1
const isBlacklisted = (url) => urlBlacklist.filter(bl => url.indexOf(bl) === 0).length > 0
const isCachableResponse = (response) => (response && response.ok)

// 安装
self.addEventListener('install', (e) => {
  console.log('[SW] install')
  e.waitUntil(
    updateStaticCache()
    .then(() => self.skipWaiting())
  )
})

// 激活状态
self.addEventListener('activate', (e) => {
  console.log('activate')
  e.waitUntil(
    clearOldCaches()
    .then(() => self.clients.claim())
  )
})

// 缓存捕获 fetch
self.addEventListener('fetch', event => {
  let request = event.request
  if (request.method !== 'GET') {
    if (!navigator.onLine && isHtmlRequest(request)) {
      return event.respondWith(caches.match(filesToCache))
    }
    return
  }

  if (isHtmlRequest(request)) {
    event.respondWith(
      fetch(request)
      .then(response => {
        if (isCachableResponse(response) && !isBlacklisted(response.url)) {
          let copy = response.clone()
          caches.open(version).then(cache => cache.put(request, copy))
        }
        return response
      })
      .catch(() => {
        return caches.match(request)
          .then(response => {
            if (!response && request.mode === 'navigate') {
              return caches.match(filesToCache)
            }
            return response
          })
      })
    )
  } else {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return
    event.respondWith(
      caches.match(request)
      .then(response => {
        return response || fetch(request)
          .then(response => {
            if (isCachableResponse(response)) {
              let copy = response.clone()
              caches.open(version).then(cache => cache.put(request, copy))
            }
            return response
          })
      })
    )
  }
})