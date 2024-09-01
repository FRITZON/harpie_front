import React, { useContext } from 'react'
import './App.css';
import AppUser from './app/AppUser';
import AppNonUser from './app/AppNonUser';
import { UserContext } from './context/UserContext';
import FloatingChatbot from './chat/FloatingChatbot';

function App() {
  const [user, setUser] = useContext(UserContext);

  return (
      <div className="App">
        {
          user?.user 
          ? <AppUser user={user} /> : <AppNonUser />
        }
        <FloatingChatbot />
      </div>
  );
}

export default App;
