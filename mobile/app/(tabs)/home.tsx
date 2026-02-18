import { ScrollView, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeTab = () => {
  return (
    <ScrollView className='bg-surface flex-1'
    contentInsetAdjustmentBehavior='automatic'>
      <Text className='text-white'>ChatTab</Text>
    </ScrollView>
  )
}

export default HomeTab; 