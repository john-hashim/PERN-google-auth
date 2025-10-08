// src/api/endpoints.ts
export const ENDPOINTS = {
  AUTH: {
    GET_ME: '/auth/me',
    GOOGLE: {
      SIGNIN: '/auth/google/signin', // POST - API-based Google sign-in
    },
    token_check: '/auth/token-check',
  },
} as const

export type EndpointValues = typeof ENDPOINTS
