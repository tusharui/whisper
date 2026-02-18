import { Pressable, ScrollView, Text } from 'react-native'
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';

const ProfileTab = () => {
  const {signOut} = useAuth()
  return (
     <ScrollView className='bg-surface flex-1'
        contentInsetAdjustmentBehavior='automatic'>
          <Text className='text-white'>profileTab</Text>
          <Pressable onPress={()=>signOut()} className="mt-4 bg-red-600 px-4 py-2">
            <Text>signout</Text>
            </Pressable>
        </ScrollView>
  )
}

export default ProfileTab