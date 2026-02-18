import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import {useAuth} from "@clerk/clerk-expo"

const AuthLayout = () => {
    const { isSignedIn } = useAuth();
    if(isSignedIn) return <Redirect href="/(tabs)/home"/>
  return (
    <View className='flex-1 mt-20 pl-5 '>
      <Text>AuthLayout</Text>
    </View>
  )
}

export default AuthLayout;