import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import InitialPage from './components/Landing/InitialPage';
import CountriesDetail from './components/detail/CountriesDetail';
import Form from './components/form/Form';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<InitialPage/>} />

        <Route path="/home" element={<Home/>} />

        <Route path="home/detail/:cod" element={<CountriesDetail />} />

        <Route path="/form" element={<Form/> } />
      
      </Routes>
    </div>
  );
}

export default App;
