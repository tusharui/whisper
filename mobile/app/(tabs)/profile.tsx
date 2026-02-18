import { ScrollView, Text } from 'react-native'
import React from 'react'

const ProfileTab = () => {
  return (
     <ScrollView className='bg-surface flex-1'
        contentInsetAdjustmentBehavior='automatic'>
          <Text className='text-white'>profileTab</Text>
        </ScrollView>
  )
}

export default ProfileTab