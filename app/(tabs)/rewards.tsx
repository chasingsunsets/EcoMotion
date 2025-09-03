import {Image, ScrollView, Text, View} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import VoucherCard from "@/components/VoucherCard";
import { images } from "@/constants/images";

const Rewards = () => {
    const vouchers = [
        {id: '1', title: 'Ez-Link $1 Top-Up', points: 2000, picture: images.icon},
        {id: '2', title: 'NTUC $5 Voucher', points: 5000, picture: images.highlight},
        {id: '3', title: 'NTUC $10 Voucher', points: 7000, picture: images.highlight},
        {id: '4', title: 'Grab $5 Voucher', points: 10000, picture: images.icon},
        {id: '5', title: 'Grab $10 Voucher', points: 10000, picture: images.icon},
        {id: '6', title: 'f $5 Voucher', points: 10000, picture: images.icon}
    ];

    return (
        <View className="flex-1">

            <ScrollView className=" px-5" showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight:"100%", paddingBottom:10 }}>
                <View className="flex-1 ml-3">
                    <>
                        <Text className={"text-3xl text-green font-bold mt-5 mb-3 "}>Redemptions</Text>

                        <FlatList
                            data={vouchers}
                            renderItem={({ item }) => (
                                <VoucherCard
                                    {...item}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            // numColumns={1}
                            // columnWrapperStyle={{
                            //     justifyContent: 'flex-start',
                            //     gap: 20,
                            //     paddingRight: 5,
                            //     marginBottom: 10
                            // }}
                            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />
                    </>
                </View>
            </ScrollView>
        </View>
    )
}
export default Rewards
// const styles = StyleSheet.create({})