/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import UserDashboardBody from "./UserDashboardBody";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo";

const UserDashboard = () => {
  return (
    <UserDashboardBody>
      <UserProfileInfo />
    </UserDashboardBody>
  );
};

export default UserDashboard;
