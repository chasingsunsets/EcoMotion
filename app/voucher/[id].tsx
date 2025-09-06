import {Image, Text, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import React, {useCallback} from 'react'
import {useLocalSearchParams, router} from "expo-router";
import {fetchVoucherDetails} from "@/services/api";
import {users} from '@/data/user';
import useFetch from "@/services/useFetch";
import {userId} from '@/constants/globals'

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

const generateExpiry = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
};

const handleRedeem = (voucher: Voucher) => {
    const user = users.find(u=>u.id===userId);

    if (!user) {
        Alert.alert('User not found.');
        return;
    }

    if (user.points >= voucher.points){
        user.points -= voucher.points;
        Alert.alert('Redemption successful.');


        const newVoucher = {
            id: `${voucher.id}-${Date.now()}`, // Unique per redemption
            vid: voucher.id,
            title: voucher.title,
            expiry: generateExpiry(15),
            picture: voucher.picture,
        };
        console.log(newVoucher.id);
        user.vouchers.push(newVoucher);
    } else {
        Alert.alert('Insufficient points. Redemption unsuccessful.');
    }
};

const Voucher = () => {
    const { id } = useLocalSearchParams();

    // const { data: voucher, loading } = useFetch(() => fetchVoucherDetails(id as string));
    const fetchVoucher = useCallback(() => fetchVoucherDetails(id as string), [id]);
    const { data: voucher, loading } = useFetch(fetchVoucher);

    // if (loading) {
    //     return <ActivityIndicator />;
    // }

    // if (!voucher ) {
    //     Alert.alert('Voucher not found.');
    //     return;
    // }

    // @ts-ignore
    return (
        <View className={" flex-1 "}>
            <ScrollView contentContainerStyle={{
            paddingBottom: 80 }}>
                <View>
                    <Image source={voucher?.picture} className="w-full h-[200px]" resizeMode="stretch"/>
                </View>

                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="font-bold text-2xl">{voucher?.title}</Text>

                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-dark-200 text-sm">Points: {voucher?.points}</Text>
                    </View>

                    <VoucherInfo label="How to Use?" value={voucher?.description}/>
                </View>
            </ScrollView>

            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
            onPress={()=> handleRedeem(voucher!)}>
                {/*<Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff"/>*/}
                <Text className="font-semibold text-base text-white">Redeem</Text>
            </TouchableOpacity>
        </View>

    )

}
export default Voucher