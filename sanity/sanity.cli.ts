import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'o7kte07u',
    dataset: 'production',
  },
  deployment: {
    appId: 's3578r5mmr0zz33gam5hg3qc',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
