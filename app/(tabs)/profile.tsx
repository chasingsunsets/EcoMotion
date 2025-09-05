import {Image, ScrollView, Text, View} from 'react-native'
import React from 'react'
import {useEffect} from 'react'
// import {useNavigation} from '@react-navigation/native'
import { router} from "expo-router";
import {icons} from "@/constants/icons"
import {users} from '@/data/user';
import User from '../authentication/[id]'
import {userId} from '@/constants/globals'

const Profile = () => {
    // const navigation = useNavigation();
    const id = userId;
    return (
        <View className="flex justify-center p-5">
            <User id={id} />
        </View>
    );
}
export default Profile
// const styles = StyleSheet.create({})