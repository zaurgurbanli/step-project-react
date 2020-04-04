import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { NoteContextProvider } from "./context/notes";
import { Homepage, Create, Archive, SingleNote } from "./pages";
import { Header } from "./commons";

function App() {
  // const [id, setId] = useState("");
  // if (localStorage.length) {
  //   setId(JSON.parse(localStorage.getItem("item")).id);
  // }

  return (
    <NoteContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/create" component={Create} />
          <Route path="/archive" component={Archive} />
          <Route path="/:id" component={SingleNote} />
        </Switch>
      </Router>
    </NoteContextProvider>
  );
}

export default App;
