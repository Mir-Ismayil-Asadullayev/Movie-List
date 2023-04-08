import React from 'react';
import { Route, Routes } from 'react-router';
import { Header } from './components/Header';
import Main from './pages/Main';
import './assets/styles/App.css';
import List from './pages/List';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/list' element={<List />}></Route>
      </Routes>
    </>
  );
}

export default App;
