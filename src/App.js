import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import { Header } from './components/Header';
import Main from './pages/Main';
import './assets/styles/App.css';
import List from './pages/List';
import Item from './pages/Item';
import { Context } from './context';

function App() {
  const [href, sethref] = useState('');
  const location = href => sethref(href);
  const value = { location, href };

  return (
    <>
      <Context.Provider value={value}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='list' element={<List />}></Route>
          <Route path='list/:name' element={<Item />}></Route>
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
