import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import { useChats } from '@/hooks/useChats'
import ChatItem from '@/components/ChatItem'
import EmptyUI from '@/components/EmptyUI'
import { useRouter } from 'expo-router'

const HomeTab = () => {
  const { data: chats, isLoading } = useChats()
  const router = useRouter()

  if (isLoading) {
    return (
      <View className="bg-surface flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <View className="bg-surface flex-1">
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => (
          <ChatItem
            chat={item}
            onPress={() => router.push({
              pathname: '/chat/[id]',
              params: {
                id: item._id,
                participantId: item.participant._id,
                name: item.participant.name,
                avatar: item.participant.avatar,
              },
            })}
          />
        )}
        ListEmptyComponent={
          <EmptyUI
            title="No chats yet"
            subtitle="Start a new conversation"
            buttonLabel="New Chat"
            onPressButton={() => router.push('/new-chat')}
          />
        }
      />
    </View>
  )
}

export default HomeTab
