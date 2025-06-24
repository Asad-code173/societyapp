"use client"

import { DropDowncomplaint } from "../../Custom-Components/DropDowncomplaint";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { FaComments } from "react-icons/fa";




import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"




export default function AdminDashboard() {

  console.log("hi");

  // const onborduser = useQuery(api.onboarduser.fetchonborduser)
  const handlecomplain = useQuery(api.complaint.fetchComplain);




  return (
    <>

      <div className="pr-20">
        <div className="flex justify-between space-x-4">
          <div className="pr-6 pl-6 pt-4">
            {/* 👇 Complaint Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaComments className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Resident Complaints
                </h2>
              </div>
              
            </div>


          </div>
        </div>
        <div className="mt-6"><Table>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>

              <TableHead className="w-[100px]">Contact Number</TableHead>
              <TableHead className="w-[100px]">Appartment Number</TableHead>
              <TableHead className="w-[100px]">Message</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {handlecomplain?.map((user) => {

              return (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.ContactNumber}</TableCell>
                  <TableCell>{user.apartmentNumber}</TableCell>
                  <TableCell>{user.Message}</TableCell>
                  {/* <TableCell>{user.Status}</TableCell> */}

                  <TableCell>
                    <DropDowncomplaint status={user.Status} id={user._id} />

                  </TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
        </div>
        </div>






      </>
      );
}
