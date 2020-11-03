import './App.css';
import Eventlite from './components/Eventlite'
import Login from './components/Login'
import AppHeader from './components/AppHeader'

function App() {

  const currentUser = function () {
    const user = localStorage.getItem('user')
    return (user)
  }

  return (
    <div className="App">
      <AppHeader />
      {currentUser() ? <Eventlite /> : <Login />}
    </div>
  );
}
export default App;
