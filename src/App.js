import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Clicker from './components/Clicker/Clicker';


function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Clicker />
    </div>
  );
}

export default App;
