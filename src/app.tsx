import "es6-shim";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

import { AppContainer } from "./appContainer";
import { reducer } from "./state/reducers";

// Provided by DefinePlugin
declare var process: {
    env: {
        NODE_ENV: string,
    },
};
const inProductionMode = () => process.env.NODE_ENV === "production";

// Logs all state changes to the console only for development builds
const logger = createLogger({
    predicate: () => !inProductionMode(),
});

// logger must be last middleware in chain
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(reducer);

const appElement = document.getElementById("app");

if (appElement != null) {
    ReactDOM.render((
        <Provider store={store}>
            <AppContainer />
        </Provider>
    ), appElement);
}
