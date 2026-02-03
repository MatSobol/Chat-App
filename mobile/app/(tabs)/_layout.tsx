import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: Colors.backgroundLighter,
          },
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: Colors.text,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Chats",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
            sceneStyle: {
              backgroundColor: Colors.background,
            },
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: "Friends",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
            sceneStyle: {
              backgroundColor: Colors.background,
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            sceneStyle: {
              backgroundColor: Colors.background,
            },
          }}
        />
      </Tabs>
    </>
  );
}
