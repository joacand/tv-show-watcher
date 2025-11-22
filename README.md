# Tv Show Watcher
An application that allows users to subscribe to their favorite TV shows and see latest and upcoming episodes.

# Build and Deploy

To run development server:

```bash
npm run dev
```

To build the application for static site hosting:
```bash
npm run build
```

Serve the `out` directory to any static file server.

## Environment Configuration
By default it builds the application using root base path `/`. If you want to host it on a subpage you need to add `.env` file with the following contents:
```
BASE_PATH="/sub-path"
ASSET_PREFIX="/sub-path"
```

It is possible to have `.env.development.local` and other environments for local development.