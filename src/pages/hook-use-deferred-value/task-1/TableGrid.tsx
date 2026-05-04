import React from "react"
import { type usersType } from "./types"

export const TableGrid = React.memo(({deferredFilterUsers, isSearching}: {deferredFilterUsers: Array<usersType>, isSearching: boolean}) => {
    return <article>
        {isSearching && <h2 className="text-olive-700 text-xl font-bold">Searching Results: {deferredFilterUsers.length}</h2>}
        <table className="table bg-slate-900 text-white rounded-md">
            <thead className="">
                <tr className="">
                    <th className="px-5">#</th>
                    <th className="px-5">Username</th>
                    <th className="px-5">Email</th>
                    <th className="px-5">Role</th>
                    <th className="px-5">Join Date</th>
                    <th className="px-5">Is Active</th>
                </tr>
            </thead>
            <tbody className="">
                {   deferredFilterUsers !== null &&
                    deferredFilterUsers.map((user, idx) => {
                        return (
                            <tr key={user?.id} className="">
                                <td className="px-5">{idx + 1}</td>
                                <td className="px-5">{user?.username}</td>
                                <td className="px-5">{user?.email}</td>
                                <td className="px-5">{user?.role}</td>
                                <td className="px-5">{user?.joinDate}</td>
                                <td className="px-5">{user?.isActive}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </article>
})