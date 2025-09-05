import {stringLiteral} from "@babel/types";
import {string} from "postcss-selector-parser";
import {images} from "@/constants/images";

export const users = [
    {id: '1', username: 'test1', password: 'Testing1', points: 23456,
    vouchers: [
        {id: '1', vid: '1', expiry: '2025-10-01', title: 'Ez-Link $1 Top-Up', picture: images.icon},
        {id: '2', vid: '2', expiry: '2025-11-01', title: 'Ez-Link $2 Top-Up', picture: images.icon}
    ]},
    {id: '2', username: 'friend2', password: 'Friending2', points: 654321,
    vouchers: [
        {id: '1', vid: '1', expiry: '2025-10-01', title: 'Ez-Link $1 Top-Up', picture: images.icon},
        {id: '2', vid: '2', expiry: '2025-11-01', title: 'Ez-Link $2 Top-Up', picture: images.icon},
        {id: '3', vid: '1', expiry: '2025-12-10', title: 'Ez-Link $1 Top-Up', picture: images.icon}]},
]
