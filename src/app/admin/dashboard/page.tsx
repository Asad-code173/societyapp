"use client"
import Card from "@/app/Custom-Components/DashboardCard";
import { MdGroups } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";

import { FaComments } from "react-icons/fa"
import { DropDown } from "../../Custom-Components/DropDown";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useStorage } from "convex/react";



import {
  Table,
  TableBody,

  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";





export default function AdminDashboard() {

  console.log("hi");

  const onborduserwithImage = useQuery(api.onboarduser.fetchonborduserWithImage);

  console.log("🧠 onbordusewithImage:", onborduserwithImage);

  const totalcomplainCount = useQuery(api.complaint.pendingComplaintCount);
  const totalResidnets = useQuery(api.onboarduser.countApprovedResidents)
  const PendingResidents = useQuery(api.onboarduser.PendingResidentsCount)



  return (
    <>
      <div className="pr-20">
        <div className="flex justify-between space-x-4">

          <Card
            title="Residents"
            value={totalResidnets ?? 0}
            icon={<MdGroups />}
          />
          <Card
            title="PendingResidents"
            value={PendingResidents ?? 0}
            icon={<MdPendingActions />}
          />
          <Card
            title="Total Complaints"
            value={totalcomplainCount ?? 0}
            icon={<FaComments />}
            footer="Tap to view details"
          />

        </div>
      </div>
      <div className="mt-6"><Table>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Appartment Number</TableHead>
            <TableHead>Move in Date</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {onborduserwithImage?.map((user) => {
            console.log("🖼️ imageUrlPrinted:", user.imageUrl);

            console.log("🧾 user.imageStorageId", user.imageStorageId);
            return (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.Contactnumber}</TableCell>
                <TableCell>{user.apartmentNumber}</TableCell>
                <TableCell>{user.moveInDate}</TableCell>
                <TableCell>
                  {user.imageUrl && user.imageUrl.startsWith("https://") ? (
                    <Image
                      src={user.imageUrl}
                      alt="Resident"
                      width={64}
                      height={64}
                    
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="text-xs text-gray-400">No Image</div>
                  )}
                </TableCell>

                <TableCell>

                  <DropDown status={user.isAdminApproved} id={user._id} />

                </TableCell>
                <TableCell>
                  <Button asChild variant="ghost">
                    <Link href={`/admin/dashboard/${user._id}`}>
                      <EyeIcon />
                    </Link>
                  </Button>
                </TableCell>

              </TableRow>
            )
          })}

        </TableBody>
      </Table>
      </div>






    </>
  );
}
