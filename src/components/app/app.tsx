import * as React from "react";
import * as ReactRouterDom from "react-router-dom";
import Main from "../main/main";

const { BrowserRouter, Switch, Route } = ReactRouterDom;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/"><Main /></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
