import React, { useState, useEffect } from 'react';
import './Clicker.css'
import Button from '../Button/Button';
import star from '../assets/star.png';

const Clicker = () => {
  const [coins, setCoins] = useState(0); //количество монет
  const [coinsToEarn, setCoinsToEarn] = useState(1000); //количество оставшихся кликов

  const [multiTapCount, setMultiTapCount] = useState(1); //удваиватель кликов
  const [multiTapCost, setMultiTapCost] = useState(100); //покупка удваивателя с указаной начальной ценой

  const [energyEarn, setEnergyEarn] = useState(1); //добываемая энергия в секунду
  const [energyChargerCost, setEnergyChargerCost] = useState(100);


//КЛИКЕР_______________________________________________________________________________________________
  const handleClick = () => { //система кликера
    if ((coinsToEarn - multiTapCount) >= 0){
      setCoins(coins + multiTapCount); //увеличение монет при клике
      setCoinsToEarn((prev) => prev - multiTapCount); //уменьшение оставшихся кликов при нажатие
    };
  };
//_____________________________________________________________________________________________________



//МАГАЗИН______________________________________________________________________________________________
  const handleBuyMultiTap = () => { //система покупки мультитапа
    if (coins >= multiTapCost) {
      setCoins(coins - multiTapCost); //уменьшение монет при покупке
      setMultiTapCount((prev) => prev + 1); //удвоение накликивания при покупке
      setMultiTapCost((prev) => prev * 2); //удвоение цены при покупке
    }
  };

  const buyEnergyCharger = () => {
    if (coins >= energyChargerCost){
        setCoins(coins - energyChargerCost);
        setEnergyEarn(energyEarn + 1);
        setEnergyChargerCost((prev) => prev * 2);
    }
  };
//______________________________________________________________________________________________________



//ЧИТ_ПАНЕЛЬ____________________________________________________________________________________________
  const plus1000coins = () => { //даёт 1000 монет
    setCoins(coins+1000);
  };
//______________________________________________________________________________________________________


  //логика увеличения оставшихся кликов в секунду и оно должно быть не больше 1000
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinsToEarn((coinsToEarn) => (coinsToEarn < 1000 ? coinsToEarn + energyEarn : 1000)); //здесь макс кол-во (1000) и прибавляется energyEarn
    }, 1000);

    return () => clearInterval(interval);
  }, [energyEarn]);

  return (
    <div>
      <div className='text'>
        <h1>Clicker App</h1>
        <p>Coins to earn: {coinsToEarn}</p>
        <p>Coins: {coins}</p>
        <p>click multiplier: {multiTapCount}</p>
        <p>Energy earning speed: {energyEarn}</p>
      </div>
      
      
      <div className="coin">
        <img src={star} alt="Clicker" width={256} height={256} onClick={handleClick} style={{ cursor: 'pointer' }} />
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