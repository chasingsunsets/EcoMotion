// export const VoucherDetails = async ({query}: { query: string}) => {}
import {vouchers} from '@/data/voucher'
import {users} from '@/data/user'

export const fetchVoucherDetails = async (voucherId: string): Promise<Voucher> => {
    try {
        const voucher = vouchers.find( v => v.id === voucherId);

        if (!voucher) throw new Error('Failed to fetch voucher details');

        return voucher;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchUserDetails = async (userId: string): Promise<User> => {
    try {
        const user = users.find( u => u.id === userId);

        if (!user) throw new Error('Failed to fetch user details');

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}