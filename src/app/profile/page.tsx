import { authOptions } from "@/api/auth/tools";
import { getServerSession } from "next-auth";
import React from "react";

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;

const Profile = async () => {
  "use client";
  const session = await getServerSession(authOptions);

  return <div>Profile</div>;
};
