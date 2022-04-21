import { database } from '@core/services/mongodb/connector';

export function useUserModel () {
    const User = database.collection('users');

    async function findByUsername (username: string) {
        return await User.findOne({ username });
    }

    return {
        findByUsername
    };
}

