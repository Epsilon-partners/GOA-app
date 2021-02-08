import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './Footer/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
