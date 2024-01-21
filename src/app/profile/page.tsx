import { authOptions } from "@/api/auth/tools";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <p>Profile</p>
      <pre>{session && JSON.stringify(session, null, 4)}</pre>
    </div>
  );
};

const ProtectedServerRoute = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/auth/signin");
  }
  return { children };
};
