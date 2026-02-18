import { View, Text } from 'react-native'
import React from 'react'
import { Redirect , Stack } from 'expo-router';
import {useAuth} from "@clerk/clerk-expo"


const AuthLayout = () => {
    const { isSignedIn } = useAuth();
    if(isSignedIn) return <Redirect href="/(tabs)/home"/>;
  return <Stack screenOptions={{headerShown:false}} />;
}

export default AuthLayout;