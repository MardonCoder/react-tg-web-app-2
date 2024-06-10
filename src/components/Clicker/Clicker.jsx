import React, { useState, useEffect } from 'react';
import './Clicker.css';
import Button from '../Button/Button';
import star from '../assets/star.png';

const Clicker = () => {
  const [coins, setCoins] = useState(0); // Количество монет
  const [coinsToEarn, setCoinsToEarn] = useState(1000); // Количество оставшихся кликов

  const [multiTapCount, setMultiTapCount] = useState(1); // Удваиватель кликов
  const [multiTapCost, setMultiTapCost] = useState(100); // Покупка удваивателя с указанной начальной ценой

  const [energyEarn, setEnergyEarn] = useState(1); // Добываемая энергия в секунду
  const [energyChargerCost, setEnergyChargerCost] = useState(100);

  // Обработчик клика
  const handleClick = () => {
    if ((coinsToEarn - multiTapCount) >= 0) {
      setCoins(coins + multiTapCount); // Увеличение монет при клике
      setCoinsToEarn((prev) => prev - multiTapCount); // Уменьшение оставшихся кликов при нажатии
    }
  };

  // Обработчик касания
  const handleTouchStart = (e) => {
    e.preventDefault(); // Предотвращаем нежелательные действия браузера
    const touches = e.touches;
    for (let i = 0; i < touches.length; i++) {
      handleClick(); // Вызываем handleClick для каждого касания
    }
  };

  // Обработчик покупки мультитапа
  const handleBuyMultiTap = () => {
    if (coins >= multiTapCost) {
      setCoins(coins - multiTapCost); // Уменьшение монет при покупке
      setMultiTapCount((prev) => prev + 1); // Увеличение накликивания при покупке
      setMultiTapCost((prev) => prev * 2); // Увеличение цены при покупке
    }
  };

  // Обработчик покупки зарядного устройства энергии
  const buyEnergyCharger = () => {
    if (coins >= energyChargerCost) {
      setCoins(coins - energyChargerCost);
      setEnergyEarn(energyEarn + 1);
      setEnergyChargerCost((prev) => prev * 2);
    }
  };

  // Чит-панель: добавляет 1000 монет
  const plus1000coins = () => {
    setCoins(coins + 1000);
  };

  // Логика увеличения оставшихся кликов в секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinsToEarn((coinsToEarn) => (coinsToEarn < 1000 ? coinsToEarn + energyEarn : 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [energyEarn]);

  return (
    <div>
      <div className='text'>
        <h1>Clicker App</h1>
        <p>Coins to earn: {coinsToEarn}</p>
        <p>Coins: {coins}</p>
        <p>Click multiplier: {multiTapCount}</p>
        <p>Energy earning speed: {energyEarn}</p>
      </div>

      <div className="coin">
        <img
          src={star}
          alt="Clicker"
          width={256}
          height={256}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <Button onClick={handleBuyMultiTap}>Buy Multi Tap for {multiTapCost} coins</Button>
      <span style={{ marginRight: '10px' }}></span>
      <Button onClick={buyEnergyCharger}>Buy charging speed for {energyChargerCost} coins</Button>
      <span style={{ marginRight: '10px' }}></span>
      <Button onClick={plus1000coins}>+1000 coins</Button>
    </div>
  );
};

export default Clicker;