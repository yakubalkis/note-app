import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'jwfb1m',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
