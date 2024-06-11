import React, { useState, useEffect } from 'react';
import './Clicker.css';
import Button from '../Button/Button';
import star from '../assets/star.png';
import { useTelegram } from '../../hooks/useTelegram';

const Clicker = () => {
    const { user, userData, saveUserData } = useTelegram();
    const [coins, setCoins] = useState(0);
    const [coinsToEarn, setCoinsToEarn] = useState(1000);
    const [multiTapCount, setMultiTapCount] = useState(1);
    const [multiTapCost, setMultiTapCost] = useState(100);
    const [energyEarn, setEnergyEarn] = useState(1);
    const [energyChargerCost, setEnergyChargerCost] = useState(100);
  
    useEffect(() => {
      if (userData) {
        setCoins(userData.coins);
        setCoinsToEarn(userData.coinsToEarn);
        setMultiTapCount(userData.multiTapCount);
        setMultiTapCost(userData.multiTapCost);
        setEnergyEarn(userData.energyEarn);
        setEnergyChargerCost(userData.energyChargerCost);
      }
    }, [userData]);
  
    const saveData = () => {
      saveUserData({
        coins,
        coinsToEarn,
        multiTapCount,
        multiTapCost,
        energyEarn,
        energyChargerCost,
      });
    };
  
    useEffect(() => {
      // Сохранение данных каждые 10 секунд
      const interval = setInterval(() => {
        saveData();
      }, 10000);
  
      // Сохранение данных при выходе из приложения
      const handleBeforeUnload = (event) => {
        saveData();
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        clearInterval(interval);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [coins, coinsToEarn, multiTapCount, multiTapCost, energyEarn, energyChargerCost]);
  
    const handleClick = () => {
      if ((coinsToEarn - multiTapCount) >= 0) {
        const newCoins = coins + multiTapCount;
        const newCoinsToEarn = coinsToEarn - multiTapCount;
        setCoins(newCoins);
      setCoinsToEarn(newCoinsToEarn);
      saveData();
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleClick();
  };

  const handleBuyMultiTap = () => {
    if (coins >= multiTapCost) {
      const newCoins = coins - multiTapCost;
      const newMultiTapCount = multiTapCount + 1;
      const newMultiTapCost = multiTapCost * 2;
      setCoins(newCoins);
      setMultiTapCount(newMultiTapCount);
      setMultiTapCost(newMultiTapCost);
      saveData();
    }
  };

  const buyEnergyCharger = () => {
    if (coins >= energyChargerCost) {
      const newCoins = coins - energyChargerCost;
      const newEnergyEarn = energyEarn + 1;
      const newEnergyChargerCost = energyChargerCost * 2;
      setCoins(newCoins);
      setEnergyEarn(newEnergyEarn);
      setEnergyChargerCost(newEnergyChargerCost);
      saveData();
    }
  };

  const plus1000coins = () => {
    const newCoins = coins + 1000;
    setCoins(newCoins);
    saveData();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCoinsToEarn((coinsToEarn) => {
        const newCoinsToEarn = coinsToEarn < 1000 ? coinsToEarn + energyEarn : 1000;
        saveUserData({ coinsToEarn: newCoinsToEarn });
        return newCoinsToEarn;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [energyEarn, saveUserData]);

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
          onTouchEnd={handleTouchEnd}
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