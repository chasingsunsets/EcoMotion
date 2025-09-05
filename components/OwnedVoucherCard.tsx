import {Image, Text, TouchableOpacity, View} from 'react-native'
import { Link } from "expo-router";
import { images } from "@/constants/images";

const OwnedVoucherCard = ({id, vid, expiry, title, picture} : UserVoucher) => {
    return (
        <Link href={`/voucher/${id}`} asChild>
             <TouchableOpacity className={"w-full"}>
                <Image source={picture}
                       className="w-full h-40 rounded-lg"
                       resizeMode="cover"
                />

                 <Text className="text-sm font-bold ">{title}</Text>
                 <View className={"flex-row items-center justify-start gap-x-1"}>
                     <Text className="text-xs ">Expiry: {expiry}</Text>
                 </View>
             </TouchableOpacity>
        </Link>
    )
}
export default OwnedVoucherCard
