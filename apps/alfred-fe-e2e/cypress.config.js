/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';

//import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

//import cypress_metamask_v2 from 'cypress-metamask-v2/cypress/plugins';

/**
 * @type {Cypress.PluginConfig}
 */

export default defineConfig({
  //e2e: nxE2EPreset(__dirname),
  e2e: {
    supportFile: 'src/support/e2e.js',
    specPattern: 'src/spec/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // cypress_metamask_v2(on, config);
      require('cypress-metamask-v2/cypress/plugins')(on, config);
      return config;
    },
    chromeWebSecurity: true,
    env: {
      SECRET_WORDS: 'test test test test test test test test test test test junk',
      PASSWORD: 'TestMetaMask',
      METAMASK_VERSION: 'latest',
      PRIVATE_KEY: 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      NETWORK_NAME: 'localhost',
      RPC_URL: 'http://127.0.0.1:7545',
      CHAIN_ID: 5777,
    },
  },
});
