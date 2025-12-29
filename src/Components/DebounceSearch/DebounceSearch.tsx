import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useUsers } from "../../utils/query";
import { User } from "../../types/users.type";

const DebounceSearch = () => {
    const [query, setQuery] = useState("");
    const [colName, setColName] = useState<string>('firstName')
    const [orderBy, setOrderBy] = useState<string>('asc')

    const { data: users, isLoading } = useUsers(colName, orderBy);
    const debounce = useDebounce(query, 1000)

    console.log(users);
    
    
    const filteredData = users?.filter((user: User) => {
        return user.firstName.toLowerCase().includes(debounce.toLowerCase())
    })

    function handleOrderBy() {
        if (orderBy === 'asc')
            setOrderBy('desc')
        else
            setOrderBy('asc')
    }

    function handleSortBy(value: string) {
        setColName(value)
    }

    return (
        <div className="mt-14 font-sans p-6">
            <div className="flex justify-between">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users..."
                    className="w-1/2 px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2">
                    <button className="px-2 py-1 bg-blue-400 cursor-pointer rounded-sm text-white" onClick={handleOrderBy}>Order By</button>
                    <select className="px-2 py-1 bg-blue-400 outline-none cursor-pointer rounded-sm text-white" value={colName} onChange={(e) => handleSortBy(e.target.value)}>
                        <option value='firstName'>Name</option>
                        <option value='age'>Age</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <p className="mt-2 text-sm text-gray-500">Loading...</p>
            ) : (
                <ul className="mt-4 space-y-2">
                    <li

                        className="flex justify-between items-center gap-2 p-3 border border-blue-500 bg-blue-50 rounded-md hover:bg-indigo-50 transition">
                        <div className="flex gap-4 flex-2">
                            <div className="">
                                <p className="font-semibold">
                                    Name
                                </p>
                            </div>
                        </div>

                        <span className="text-sm font-semibold md:flex-1 text-gray-600">
                            Age
                        </span>
                        <span className="text-sm font-semibold md:flex-1 text-gray-600">
                            Gender
                        </span>
                        <span className="text-sm font-semibold md:flex-1 text-gray-600">
                            Role
                        </span>
                        <span className="text-sm font-semibold md:flex-1 text-gray-600">
                            Department
                        </span>
                        <span className="text-sm font-semibold md:flex-1 text-gray-600">
                            Address
                        </span>
                    </li>
                    {filteredData.map((user: User) => (
                        <li
                            key={user.id}
                            className="flex justify-between items-center gap-2 p-3 border border-blue-500 bg-blue-50 rounded-md hover:bg-indigo-50 transition">
                            <div className="flex gap-4 flex-2">

                                <div>
                                    <img width={24} height={24} src={user.image} />
                                </div>
                                <div className="">
                                    <p className="font-normal">
                                        {user.firstName} {user.lastName}
                                    </p>
                                </div>
                            </div>

                            <span className="text-sm md:flex-1 text-gray-600">
                                {user.age}
                            </span>
                            <span className="text-sm md:flex-1 text-gray-600">
                                {user.gender}
                            </span>
                            <span className="text-sm md:flex-1 text-gray-600">
                                {user.role}
                            </span>
                            <span className="text-sm md:flex-1 text-gray-600">
                                {user.company.department}
                            </span>
                            <span className="text-sm md:flex-1 text-gray-600">
                                {user.company.address.city}, {user.company.address.country}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DebounceSearch;