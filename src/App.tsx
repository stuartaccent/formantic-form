import React from 'react';
import { AppForm } from './AppForm';

function App() {
  return (
    <div className="App">
      <AppForm maxWidth="sm"
               api="http://localhost"
               token="1MtzFeCn-nEUkiifok6U4R8NDr9QMyq9G0iutBOA9Ji9GIlrYFKhRfC_DbDhMNfDlxB-vodUNu3RiP6NA8Pn6Q" />
    </div>
  );
}

export default App;
