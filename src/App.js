import './App.css';
import Eventlite from './components/Eventlite'
import Login from './components/Login'
import AppHeader from './components/AppHeader'
import Signup from './components/Signup'

function App() {

  const currentUser = function () {
    const user = localStorage.getItem('user')
    return (user)
  }

  return (
    <div className="App">
      <AppHeader />
      {currentUser() ? <Eventlite /> : <><Login /> <Signup /></> }
    </div>
  );
}
export default App;
