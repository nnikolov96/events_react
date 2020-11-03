import './App.css';
import Eventlite from './components/Eventlite'
import Login from './components/Login'

function App() {
  
  const currentUser = function () {
    const user = localStorage.getItem('user')
    return (user)
  }

  return (
    <div className="App">
      {currentUser() ? <Eventlite /> : <Login />}
    </div>
  );
}
export default App;
