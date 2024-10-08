"use client"
import React, { useEffect, useState } from 'react'
import SettingsDetails from './SettingsDetails'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import SettingsLogin from './SettingsLogin';
import { auth } from '@/app/firebase'
import { getSubscriptionStatus } from '@/stripe/getPremiumStatus'
import { onAuthStateChanged } from 'firebase/auth'
import { signInUser } from '@/redux/slices/userSlice'

function Settings() {

  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (!currentUser) {
        dispatch(signInUser(null));
        return;
      }

      dispatch(
        signInUser({
          email: currentUser.email,
          uid: currentUser.uid,
          subscription: null,
        })
      );

      const fetchPremium = async () => {
        const premiumStatus = await getSubscriptionStatus();
        console.log('premium status:', premiumStatus)
        dispatch(
          signInUser({
            email: currentUser.email,
            uid: currentUser.uid,
            subscription: premiumStatus,
          })
        );
      }

      try {
        fetchPremium();
      } catch (error) {
        console.error("Error checking premium status", error);
      }
    });

    return () => unsubscribe();
  }, [auth.currentUser]);


  return (    
    <div className="settings">
        <div className="page-row settings__row">
            <h1 className="settings__title">Settings</h1>
            <SettingsDetails />
        </div>
    </div>
  )
}

export default Settings