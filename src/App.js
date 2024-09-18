import { Provider } from 'react-redux';
import { store } from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import './css/App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)

function App() {
  return (
    <div className='app-container'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />}>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="/Dashboard" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
