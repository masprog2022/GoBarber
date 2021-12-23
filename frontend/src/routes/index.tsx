import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
       <Route path="/" element={<SignIn />} />
       <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
)