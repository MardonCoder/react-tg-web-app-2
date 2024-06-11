import { useEffect, useState } from "react";
import { db, doc, getDoc, setDoc, updateDoc } from "../components/Firebase/firebase";

const tg = window.Telegram.WebApp;

export function useTelegram() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        setUser(user);
  
        const loadUserData = async () => {
          const userDoc = doc(db, "users", user.id.toString());
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            const initialData = {
              coins: 0,
              coinsToEarn: 1000,
              multiTapCount: 1,
              multiTapCost: 100,
              energyEarn: 1,
              energyChargerCost: 100
            };
            await setDoc(userDoc, initialData);
            setUserData(initialData);
          }
        };
  
        loadUserData();
      }
    }, []);
  
    const saveUserData = async (data) => {
      if (user) {
        const userDoc = doc(db, "users", user.id.toString());
        await updateDoc(userDoc, data);
      }
    };
  
    return {
      tg,
      user,
      userData,
      saveUserData
    };
  }