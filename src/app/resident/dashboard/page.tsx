// app/admin/dashboard/page.tsx (or any server component)


import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { api } from "../../../../convex/_generated/api";


export default async function ResidentDashboard() {
  const user = await currentUser();
  // console.log(user);


  if (!user) { return redirect("/sign-in"); }



  const email = user.emailAddresses[0]?.emailAddress;
  const clerkId = user.id;
  const role = user.publicMetadata.role as string || "resident";
  // console.log(role);
  if (role === 'resident') {
    const onboardInfo = await fetchQuery(api.onboarduser.onboardResidentInfo, { clerkId })
    if (!onboardInfo || !onboardInfo.isAdminApproved) {
      return redirect("/resident/onboard");
    }

  }

  return (
    <div>
      <h1>Resident Dashboard</h1>
      <p><strong>User ID:</strong> {clerkId}</p>
      <p><strong>Email:</strong> {email}</p>

      <p><strong>Role:</strong> {role}</p>
      <UserButton />
    </div>
  );
}
