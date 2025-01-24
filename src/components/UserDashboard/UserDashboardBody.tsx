/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import UserSidebar from "./UserSidebar/UserSidebar";

const UserDashboardBody = ({ children }: { children: any }) => {
    return (
        <div>
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <UserSidebar />
          </div>
          <div className="col-span-10">{children}</div>
        </div>
      </div>
    );
};

export default UserDashboardBody;