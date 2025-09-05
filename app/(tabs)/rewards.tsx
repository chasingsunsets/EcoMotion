import {Image, ScrollView, Text, View} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import VoucherCard from "@/components/VoucherCard";
import { images } from "@/constants/images";
import {vouchers} from '@/data/voucher';
const Rewards = () => {


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