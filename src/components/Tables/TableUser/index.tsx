import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

import type { UserReqres } from '@/features/authentication'

function TableUser({ users }: { users: UserReqres[] }) {
  return (
    <table className="table-auto text-gray-300">
      <thead className="bg-gray-700">
        <tr className="">
          <th className="min-w-[400px] rounded-tl-lg py-2 px-6 text-left uppercase">
            User
          </th>
          <th className="min-w-[200px] py-2 px-6 text-left uppercase">State</th>
          <th className="min-w-[200px] py-2 px-6 text-left uppercase">Join</th>
          <th className="min-w-[100px] rounded-tr-lg py-2 px-6 text-left uppercase">
            Detail
          </th>
        </tr>
      </thead>
      <tbody className="">
        {users &&
          users.map((user, idx) => {
            return (
              <tr
                key={user.id}
                className={`${
                  !(idx % 2 === 0) && 'bg-gray-800'
                } border-b border-solid border-gray-700 text-white`}
              >
                <td className="flex items-center gap-4 py-2 px-6 text-sm">
                  <figure>
                    <img
                      src={user.avatar}
                      alt="user_image"
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </figure>
                  <div>
                    <p className="text-base font-bold">
                      {user.first_name + ' ' + user.last_name}
                    </p>
                    <p className="cursor-pointer text-xs text-blue-600">
                      {user.email}
                    </p>
                  </div>
                </td>
                <td className="py-2 px-6 text-sm font-bold">ENG</td>
                <td className="py-2 px-6 text-sm">
                  {moment(new Date()).format('DD MMMM YYYY')}
                </td>
                <td className="py-2 px-6 text-sm">
                  <Link
                    to={{
                      pathname: `/users/${user.id}`,
                    }}
                    state={{
                      id: user.id,
                      modal: true,
                    }}
                    className="pointer-events-none rounded-md bg-gray-500 p-2"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default TableUser
