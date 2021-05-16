/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly API_URL: string
    readonly GOOGLE_ANALYTICS_ID: string
    readonly BUGSNAG_API_KEY: string
  }
}
