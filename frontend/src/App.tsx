import React from 'react';

//import SignIn from './pages/SignIn';

//import SignUp from './pages/SignUp';



import GlobalStyle from './styles/global';

import { AppProvider } from './hooks';

import { Router } from './routes';



const App: React.FC = () =>
(
<>
 <AppProvider>
    <Router />
 </AppProvider>
  <GlobalStyle />
  </>
)

export default App;
