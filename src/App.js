import React from "react";
import Navigation from "./components/Navigation";
import { GlobalProvider } from './components/GlobalContext';

const App = () => (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
    );
export default App;


    
     


