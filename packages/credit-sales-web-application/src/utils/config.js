export const SERVER_PORT = process.env.SERVER_PORT || 80
// export const REDIS_HOST = process.env.REDIS_HOST || 'redis-cache-server.default.svc.cluster.local'
export const REDIS_HOST = process.env.REDIS_HOST || 'creditsalescache.redis.cache.windows.net'
export const REDIS_PORT = process.env.REDIS_PORT || '6379'
export const SESSION_COOKIE_PASSWORD = process.env.SESSION_COOKIE_PASSWORD || 'the-password-must-be-at-least-32-characters-long'
export const UPLOADED_FILE_DIRECTORY_NAME = process.env.UPLOADED_FILE_DIRECTORY_NAME || '/tmp/'
export const SERVICE_BUS_QUEUE_ENDPOINT = process.env.SERVICE_BUS_QUEUE_ENDPOINT || 'Endpoint=sb://bngcredtisales.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xA6uda3rGHzt3/PgvaZBpGyvfI41GcQrjsuXGCJ6eZ4=';
export const SERVICE_BUS_QUEUE_NAME = process.env.SERVICE_BUS_QUEUE_NAME || 'creditsales'
export const AZURE_QUEUE_NAME = process.env.AZURE_QUEUE_CONNECTION_STRING || 'http://127.0.0.1:10001/devstoreaccount1/creditsales'
