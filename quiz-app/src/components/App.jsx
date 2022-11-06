import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Categories from "./Categories";
import Header from "./Header";
import Quiz from "./Quiz";

export default () => (
  <>
    <BrowserRouter>
      <Header />
      <div className="container mx-auto">
        <Switch>
          <Route path="/" exact>
            <Categories />
          </Route>
          <Route path="/quiz" component={Quiz} />
        </Switch>
      </div>
    </BrowserRouter>
  </>
);
