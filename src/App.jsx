import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes/allRole';

const App = () => (
  <BrowserRouter>
    <Routes>
      {routes.map(({ path, element }, idx) => (
        <Route key={idx} path={path} element={element} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default App;