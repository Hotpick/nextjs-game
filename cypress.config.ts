import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {},
  },
});
