// Import commands.js using ES2015 syntax:
import "./commands";

import { MountOptions, MountReturn } from "cypress/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import { RootState } from "../../src/features/store";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React Component
       * @param component the React node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions & { reduxStore?: EnhancedStore<RootState> }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}
