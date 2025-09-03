import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";

const Details = ({title} : Voucher) => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Voucher: {title}</Text>
        </View>
    )
}
export default Details
const styles = StyleSheet.create({})