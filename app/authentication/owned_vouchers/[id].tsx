import {Image, Text, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import {useLocalSearchParams, router} from "expo-router";
import {fetchVoucherDetails, useRandomCode} from "@/services/api";
import {users} from '@/data/user';
import useFetch from "@/services/useFetch";
import {icons} from '@/constants/icons'

interface VoucherInfoProps {
    label: string;
    value?: string | number | null;
}

const VoucherInfo = ({ label, value}: VoucherInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-xl font-bold ">
            {label}
        </Text>
        <Text className="text-lg font-normal ">
            {value || 'N/A'}
        </Text>
    </View>
)


const Voucher = () => {
    const { id } = useLocalSearchParams();

    // const { data: voucher, loading } = useFetch(() => fetchVoucherDetails(id as string));
    const fetchVoucher = useCallback(() => fetchVoucherDetails(id as string), [id]);
    const { data: voucher, loading } = useFetch(fetchVoucher);

    const { code, generateCode } = useRandomCode();

    useEffect(() => {
        generateCode(); // generate code when component mounts
    }, []);


    // @ts-ignore
    return (
        <View className={" flex-1 "}>
            <ScrollView contentContainerStyle={{
                paddingBottom: 80 }}>
                <View>
                    <Image source={voucher?.picture} className="w-full h-[250px]" resizeMode="stretch"/>
                </View>

                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="font-bold text-2xl">{voucher?.title}</Text>

                    <View className="flex-row items-center gap-x-1 mt-2">
                        {/*<Text className="text-dark-200 text-sm">Points: {voucher?.points}</Text>*/}
                    </View>

                    <View className="flex mx-auto mt-10 mb-10 items-center bg-gray-100">
                        <Text className="bg-primary text-white px-6 py-4 rounded-lg shadow-lg text-2xl">
                            Redemption Code: {code}!
                        </Text>
                    </View>

                    <VoucherInfo label="How to Use?" value={voucher?.description}/>
                </View>
            </ScrollView>

            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                              onPress={router.back}>
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff"/>
                <Text className="font-semibold text-base text-white">Back</Text>
            </TouchableOpacity>
        </View>

    )

}
export default Voucher