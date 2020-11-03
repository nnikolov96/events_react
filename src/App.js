import './App.css';
import Eventlite from './components/Eventlite'
import Login from './components/Login'
import AppHeader from './components/AppHeader'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {

  const currentUser = function () {
    const user = localStorage.getItem('user')
    return (user)
  }

  return (
    <Router>
      <Route path="/">
        <AppHeader />
      </Route>
      <Route exact path="/">
        <Eventlite />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Router>
  );
}
export default App;
