import { Shop } from "@/types/shop";

export const shops: Shop[] = [
    {
        id: 'd',

        name: 'ozod',

        ownerId: 'uwehd', // MUHIM: user id

        plan: 'free',

        isBlocked: false,

        debtLimit: 20,
        createdAt: new Date().toISOString(),
    },
];
