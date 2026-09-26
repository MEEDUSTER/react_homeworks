/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (2.2.13).
 * {@link https://github.com/mswjs/msw}
 *
 * Users must not modify this file directly.
 * To update this file, run `npx msw init <PUBLIC_DIR>`.
 */

const INTEGRITY_CHECKSUM = '2e457f920f86cf33d4554b5dfd4f6c56'
const IS_MOCKED_RESPONSE = Symbol('is_mocked_response')
const activeClientIds = new Set()

self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !event.data) {
    return
  }

  const client = await self.clients.get(clientId)

  if (!client) {
    return
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }

    default:
      break
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event
  const accept = request.headers.get('accept') || ''

  if (request.mode === 'navigate') {
    return
  }

  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  if (activeClientIds.size === 0) {
    return
  }

  event.respondWith(
    handleRequest(event, request).catch((error) => {
      if (error.name === 'NetworkError') {
        return
      }

      console.error(
        '[MSW] Failed to mock a "%s" request to "%s": %s',
        request.method,
        request.url,
        error
      )
    })
  )
})

async function handleRequest(event, request) {
  const client = await resolveMainClient(event)
  const response = await sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: Math.random().toString(36).substring(2),
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        cache: request.cache,
        credentials: request.credentials,
        destination: request.destination,
        integrity: request.integrity,
        mode: request.mode,
        priority: request.priority,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        body: await request.clone().arrayBuffer(),
      },
    },
    [request.body].filter(Boolean)
  )

  if (response.type === 'MOCK_RESPONSE') {
    return respondWithMock(response.payload)
  }

  if (response.type === 'MOCK_NOT_FOUND') {
    return fetch(request)
  }

  return fetch(request)
}

async function resolveMainClient(event) {
  const client = await self.clients.get(event.clientId)

  if (client?.frameType === 'top-level') {
    return client
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  return allClients
    .filter((client) => {
      return client.frameType === 'top-level'
    })
    .find((client) => {
      return activeClientIds.has(client.id)
    })
}

async function sendToClient(client, message, transferrables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(new Error(event.data.error))
      }

      resolve(event.data)
    }

    client.postMessage(
      message,
      [channel.port2, ...transferrables].filter(Boolean)
    )
  })
}

function respondWithMock(response) {
  return new Response(response.body, {
    ...response,
    headers: new Headers(response.headers),
  })
}
