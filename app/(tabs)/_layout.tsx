import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {ImageBackground} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    // headerShown: false
                    tabBarIcon: ({ focused }) => (
                        <>
                            <ImageBackground>
                                <MaterialIcons name="home" tintColor="#72bf6a" size={25} />
                            </ImageBackground>
                        </>
                    )
                }}
            />
            <Tabs.Screen
                name="rewards"
                options={{
                    title: "Rewards",
                    // headerShown: false
                    tabBarIcon: ({ focused }) => (
                        <>
                            <ImageBackground>
                                <MaterialIcons name="shopping-cart" tintColor="#72bf6a" size={25} />
                            </ImageBackground>
                        </>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    // headerShown: false
                    tabBarIcon: ({ focused }) => (
                        <>
                            <ImageBackground>
                                <MaterialIcons name="supervised-user-circle" tintColor="#72bf6a" size={25} />
                            </ImageBackground>
                        </>
                    )
                }}
            />
        </Tabs>
    )
}
export default _Layout
// const styles = StyleSheet.create({})