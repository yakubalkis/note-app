/// <reference types="cypress" />

import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import { store } from "../../src/features/store";

Cypress.Commands.add("mount", (component: React.ReactNode, options = {}) => {
  const wrappedComponent = (
    <Provider store={store}>
      <>{component}</>
    </Provider>
  );
  return mount(wrappedComponent, options);
});
