import {FlatList, ScrollView, Text, View} from 'react-native'
import React, {useCallback} from 'react'
import {fetchUserDetails} from "@/services/api";
import useFetch from "@/services/useFetch";
import {vouchers} from "@/data/voucher";
import OwnedVoucherCard from "@/components/OwnedVoucherCard";

type Props = {
    id: string;
}

const User: React.FC<Props> = ({id}) => {
    const fetchUser = useCallback(() => fetchUserDetails(id as string), [id]);
    const { data: user, loading } = useFetch(fetchUser);

    const ownedVouchersIds = user?.vouchers ?? [];
    // const ownedVouchers = ownedVouchersIds
    //     .map((vId: string) => vouchers.find(v=> v.id === vId))
    //     .filter(Boolean);

    const ownedVouchers = (user?.vouchers ?? [])
        .map(({ id, vid, expiry, title, picture }: UserVoucher, index: number) => {
            const voucher = vouchers.find(v => v.id === vid);
            if (!voucher) return null;

            return {
                ...voucher,
                instanceId: `${id}-${index}`,
                expiry,
                title,
                picture
            };
        })
        .filter(Boolean);

    return (
        <View >
            <ScrollView className=" px-5" showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight:"100%", paddingBottom:10 }}>

            <Text className={"font-bold text-3xl"}>Welcome, {user?.username}!</Text>

            <View className="flex-row items-center gap-x-1 mt-2">
                <Text className="text-dark-200 text-base">Points: {user?.points}</Text>
            </View>

                    <View className="flex-1 ml-3">
                        <>
                            <Text className={"text-3xl text-green font-bold mt-5 mb-3 "}>Vouchers Owned</Text>

                            <FlatList
                                data={ownedVouchers}
                                renderItem={({ item }) => (
                                    <OwnedVoucherCard
                                        {...item}

                                    />
                                )}
                                keyExtractor={(item) => item.instanceId}
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
export default User
