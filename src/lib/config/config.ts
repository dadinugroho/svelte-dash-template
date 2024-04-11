export const site = {
  // appName: import.meta.env.VITE_API_NAME || 'dashboard',
  appName: import.meta.env.VITE_API_NAME,
  cookieKey: 'sessionId',
  // pocketbaseServer: import.meta.env.VITE_PB_SERVER || 'http://localhost:8090'
  pocketbaseServer: import.meta.env.VITE_PB_SERVER
}

export const menu = [
  {key: 'dashboard', label: 'Dashboard', url: '/'},
  {key: 'sales', label: 'Sales', url: '/sales'}
]

export const tokenOpts = {
  httpOnly: true,
  sameSite: 'strict' as 'strict',
  path: '/',
  // secure: true     // activate in production while we use https
}