import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from 'react-helmet';

import HomeSearch from "./pages/HomeSearch/HomeSearch";


function App() {
  return (
      <Router>
        <link
          rel="script"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
        <Switch>
          <Route path="/" exact component={HomeSearch} />
          {/* <Route path="/" exact component={SearchResults} /> */}
        </Switch>
      </Router>
  );
}

export default App;
