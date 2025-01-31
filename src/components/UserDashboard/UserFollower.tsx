/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/context/AuthContext";

const UserFollower = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="p-10">
        <h1 className="font-sourGummy text-center text-3xl font-bold mb-10">Follower List</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
             {user?.followers && user?.followers?.map((item, index) => ( <tr key={index + 1}>
                <th>{index+1}</th>
                <td><img className="w-16 rounded-full" src={item.image} alt="" /></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>))}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserFollower;
