import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import store from "./redux/store";
import Root from "./containers";
import theme from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Root />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
