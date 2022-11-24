import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";
import Quiz from "./Quiz";
import Result from "./Result";

export default () => (
  <>
    <BrowserRouter>
      <Header />
      <div className="container mx-auto">
        <Switch>
          <Route path="/" exact>
            <Categories />
          </Route>
          <Route path="/quiz" exact component={Quiz} />
          <Route path="/quiz/result" component={Result} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  </>
);
