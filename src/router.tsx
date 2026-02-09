import { createRouter, createHashHistory } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

const hashHistory = createHashHistory()

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    history: hashHistory,
    context: {},

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
