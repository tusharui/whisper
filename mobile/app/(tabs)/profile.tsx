import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { useCurrentUser } from '@/hooks/useAuth'
import { Image } from 'expo-image'

const ProfileTab = () => {
  const { signOut } = useAuth()
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <View className="bg-surface flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <View className="bg-surface flex-1 items-center pt-20 px-6">
      {user?.avatar && (
        <Image
          source={user.avatar}
          style={{ width: 100, height: 100, borderRadius: 999 }}
        />
      )}
      <Text className="text-foreground text-xl font-semibold mt-4">
        {user?.name}
      </Text>
      <Text className="text-subtle-foreground text-sm mt-1">
        {user?.email}
      </Text>

      <Pressable
        onPress={() => signOut()}
        className="mt-10 bg-red-600 px-6 py-3 rounded-full"
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default ProfileTab
