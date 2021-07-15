import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeSearch from "./pages/HomeSearch/HomeSearch";


function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomeSearch} />
          {/* <Route path="/" exact component={SearchResults} /> */}
        </Switch>
      </Router>
  );
}

export default App;
