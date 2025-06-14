// app/admin/dashboard/page.tsx (or any server component)

import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const user = await currentUser();
  // console.log(user);
  

  if (!user) {
    return redirect("/sign-in");
  }

  const email = user.emailAddresses[0]?.emailAddress;
 
  const id = user.id;

  // Type assertion for role stored in publicMetadata
  const role = user.publicMetadata.role as string || "resident";
  // console.log(role);
  

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p><strong>User ID:</strong> {id}</p>
      <p><strong>Email:</strong> {email}</p>
     
      <p><strong>Role:</strong> {role}</p>
      <UserButton/>
    </div>
  );
}
