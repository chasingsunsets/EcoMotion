// import {Client, Databases, Query} from "react-native-appwrite";
//
// const DATABASE_USER_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_USER_ID!;
// const COLLECTION_USER_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_USER_ID!;
//
// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
//
// const database_user = new Databases(client);
//
// export const updateCount = async(query: string, user: User)=> {
//     const result = await database_user.listDocuments(DATABASE_USER_ID, COLLECTION_USER_ID, [
//         Query.equal('searchUser', query)
//     ])
// }