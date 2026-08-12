import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function previewDirectoryIndexes() {
  const rewritePreviewRoute = (request, _response, next) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      next()
      return
    }

    const [pathname, query = ''] = request.url.split('?')
    const isPreviewPage = /^\/previews\/(gouveia-socials|carli-and-co)(?:\/[^.]*)?\/?$/.test(pathname)

    if (isPreviewPage) {
      const indexPath = pathname.endsWith('/') ? `${pathname}index.html` : `${pathname}/index.html`
      request.url = query ? `${indexPath}?${query}` : indexPath
    }

    next()
  }

  return {
    name: 'preview-directory-indexes',
    configureServer(server) {
      server.middlewares.use(rewritePreviewRoute)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewritePreviewRoute)
    },
  }
}

export default defineConfig({
  plugins: [previewDirectoryIndexes(), react()],
})
