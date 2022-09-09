export const SERVER_PORT = process.env.SERVER_PORT || 3000
export const REDIS_HOST = process.env.REDIS_HOST || 'host.docker.internal'
export const REDIS_PORT = process.env.REDIS_PORT || '6379'
export const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/creditsales'
export const SESSION_COOKIE_PASSWORD = process.env.SESSION_COOKIE_PASSWORD || 'the-password-must-be-at-least-32-characters-long'
