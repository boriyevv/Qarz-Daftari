"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import {
    getAllShops,
    createShop,
    updateShopStatus,
} from "@/lib/adminShopService";
import { getAllUsers, createUser } from "@/lib/adminUserService";

type Shop = {
    id: string;
    name: string;
    plan: string;
    trial_until: string | null;
    paid_until: string | null;
    grace_until: string | null;
    force_active: boolean;
};

type User = {
    id: string;
    email?: string;
};

export default function AdminPage() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [newShopName, setNewShopName] = useState("");
    const [newOwnerId, setNewOwnerId] = useState("");

    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");


    const load = async () => {
        setLoading(true);
        const s = await getAllShops();
        const u = await getAllUsers();
        setShops(s || []);
        setUsers(u || []);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const today = new Date().toISOString().slice(0, 10);

    const getStatus = (s: Shop) => {
        if (s.force_active) return "ACTIVE";
        if (s.trial_until && today <= s.trial_until) return "ACTIVE";
        if (s.paid_until && today <= s.paid_until) return "ACTIVE";
        if (s.grace_until && today <= s.grace_until) return "GRACE";
        return "BLOCKED";
    };

    const statusColor = (status: string) =>
        status === "ACTIVE"
            ? "bg-green-100 text-green-700"
            : status === "GRACE"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-6">
                <h1 className="text-2xl font-bold">Admin Panel</h1>

                {/* Create User */}
                <div className="bg-white rounded shadow p-4 space-y-3">
                    <h2 className="font-semibold">Create client user</h2>

                    <div className="flex gap-2 flex-col md:flex-row">
                        <input
                            placeholder="Email"
                            className="border p-2 rounded flex-1"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                        />

                        <input
                            placeholder="Password"
                            className="border p-2 rounded flex-1"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                        />

                        <button
                            className="bg-black text-white px-4 py-2 rounded"
                            onClick={async () => {
                                await createUser(newUserEmail, newUserPassword);
                                alert("User created");
                                load();
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>


                {/* CREATE SHOP */}
                <div className="bg-white rounded shadow p-4 space-y-3">
                    <h2 className="font-semibold">Yangi shop yaratish</h2>

                    <div className="flex flex-col md:flex-row gap-2">
                        <input
                            placeholder="Shop nomi"
                            className="border p-2 rounded flex-1"
                            value={newShopName}
                            onChange={(e) => setNewShopName(e.target.value)}
                        />
                        <select
                            className="border p-2 rounded flex-1"
                            value={newOwnerId}
                            onChange={(e) => setNewOwnerId(e.target.value)}
                        >
                            <option value="">Shop egasini tanlang</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.email || u.id.slice(0, 6)}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-black text-white px-4 py-2 rounded"
                            onClick={async () => {
                                await createShop(newShopName, newOwnerId);
                                setNewShopName("");
                                setNewOwnerId("");
                                load();
                            }}
                        >
                            Yaratish
                        </button>
                    </div>
                </div>

                {/* SHOP LIST */}
                {loading ? (
                    <p>Yuklanmoqda...</p>

                    
                    
                    
                    
                ) : (
                    <div className="space-y-4">
                        {shops.map((shop) => {
                            const status = getStatus(shop);
                            return (
                                <div
                                    key={shop.id}
                                    className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                >
                                    <div>
                                        <h3 className="font-semibold text-lg">{shop.name}</h3>
                                        <div className="text-sm text-gray-500 space-x-2">
                                            <span>Trial: {shop.trial_until || "-"}</span>
                                            <span>Paid: {shop.paid_until || "-"}</span>
                                            <span>Grace: {shop.grace_until || "-"}</span>
                                        </div>
                                    </div>

                                    <div
                                        className={`px-3 py-1 rounded text-sm font-medium w-fit ${statusColor(
                                            status
                                        )}`}
                                    >
                                        {status}
                                    </div>

                                    <div className="flex gap-2 flex-wrap">
                                        <button onClick={async () =>{  
                                            await updateShopStatus(shop.id, "BLOCK") 
                                            await load()}} className="px-3 py-1 rounded bg-red-600 text-white">
                                            Block
                                        </button>

                                        <button onClick={async () =>{ 
                                            await updateShopStatus(shop.id, "UNBLOCK") 
                                            await load()}} className="px-3 py-1 rounded bg-green-600 text-white">
                                            Unblock
                                        </button>

                                        <button onClick={async () =>{ 
                                            await updateShopStatus(shop.id, "GRACE") 
                                            await load()}} className="px-3 py-1 rounded bg-yellow-500 text-white">
                                            Imtiyoz +3d
                                        </button>

                                        <button onClick={async () =>{ 
                                           await updateShopStatus(shop.id, "FORCE_ON") 
                                            await load()}} className="px-3 py-1 rounded bg-gray-400 text-white">
                                            Force ON
                                        </button>

                                        <button onClick={async () =>{ 
                                            await updateShopStatus(shop.id, "FORCE_OFF") 
                                            await load()}} className="px-3 py-1 rounded bg-gray-900 text-white">
                                            Force OFF
                                        </button>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AdminGuard>
    );
}
