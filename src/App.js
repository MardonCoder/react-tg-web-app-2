import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close()
  }

  const Clicker = () => {
    const [count, setCount] = useState(0);
  
    const handleClick = () => {
      setCount(count + 1);
    };
  }

  return (
    <div className="App">
      <h1>Clicker App</h1>
      <p>Count: {count}</p>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk3Ylt99YuoPEDlF838eaMID6VsHgQiO_eGg&s" alt="Clicker" onClick={handleClick} style={{ cursor: 'pointer' }} />
      work
      <button onClick = {onClose}>Закрыть</button>
    </div>
  );
}

export default App;
