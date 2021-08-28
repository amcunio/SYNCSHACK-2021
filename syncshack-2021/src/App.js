import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';

function App() {
  return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return <Login {...props} />;
            }}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => {
              return <Dashboard {...props} />;
            }}
          />
          <Route
            exact
            path="/playground"
            render={(props) => {
              return <Playground {...props} />;
            }}
          />
        </Switch>
      </Router>
  );
}

export default App;
