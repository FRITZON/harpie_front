import React, { useContext } from 'react'
import './App.css';
import AppUser from './app/AppUser';
import AppNonUser from './app/AppNonUser';
import { UserContext } from './context/UserContext';
import FloatingChatbot from './chat/FloatingChatbot';
import FlutterWaveButton from './components/pay/Flutterwave';

function App() {
  const [user, setUser] = useContext(UserContext);

  return (
      <div className="App">
        {/* <FlutterWaveButton amount={1000} transaction_id={Math.floor(Math.random() * 1000000000)} /> */}
        {
          user?.user 
          ? <AppUser user={user} /> : <AppNonUser />
        }
        <FloatingChatbot />
      </div>
  );
}
// yHOhXlHOoPj
export default App;
