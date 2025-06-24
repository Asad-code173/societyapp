"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel"; // ✅ Import this

export const DropDown = ({
  status,
  id,
}: {
  status: boolean;
  id: Id<"residentOnboardDetails">; // ✅ Proper type here
}) => {
  const approveResident = useMutation(api.onboarduser.approveResident);

  const displayText = status ? "Approved" : "Pending";

  const handleApprove = () => {
    if (!status) {
      approveResident({ id });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-black hover:text-white rounded-md px-3 py-1">
          {displayText}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        {!status ? (
          <DropdownMenuItem onClick={handleApprove}>Approve</DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled>Already Approved</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
