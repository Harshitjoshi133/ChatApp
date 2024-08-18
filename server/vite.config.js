export default defineConfig({
    server: {
      proxy: {
        // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
        '/foo': 'http://localhost:4567',
        '/api': {
          target: '*',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
        '^/fallback/.*': {
          target: '*',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ''),
        },
        // Using the proxy instance
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          configure: (proxy, options) => {
            // proxywill be an instance of 'http-proxy'
          },
        },
        // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        '/socket.io': {
          target:mode=="devlopment" ?'ws://localhost:5174':'wss://chatapi-mauve-iota.vercel.app',
          ws: true,
          changeOrigin:true
        },
      },
    },
  })