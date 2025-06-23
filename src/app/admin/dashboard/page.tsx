
import Card from "@/app/Custom-Components/DashboardCard";
import { MdGroups } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { BiMessageAltError } from "react-icons/bi";
import {  FaComments } from "react-icons/fa"




export default function AdminDashboard() {



  // const user = await currentUser();
  // console.log(user);


  // if (!user) {
  //   return redirect("/sign-in");
  // }
  // const email = user.emailAddresses[0]?.emailAddress;
  // // Type assertion for role stored in publicMetadata
  // const role = user.publicMetadata.role as string || "resident";
  // console.log(role);


  return (
    <>
    <div className="pr-20">
        <div className="flex justify-between space-x-4">

        <Card
          title="Residents"
          value="10"
          icon={<MdGroups />}
        />
        <Card
          title="PendingResidents"
          value="5"
          icon={<MdPendingActions />}
        />
        <Card
          title="Total Complaints"
          value={3}
          icon={<FaComments />}
          footer="Tap to view details"
        />

      </div>
    </div>
    



    </>
  );
}
