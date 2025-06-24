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

export const DropDowncomplaint = ({
  status,
  id,
}: {
  status: boolean;
  id: Id<"complaint">; // ✅ Proper type here
}) => {
  const approveResident = useMutation(api.complaint.handleComplaint);

  const displayText = status ? "Resolved" : "Pending";

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
          <DropdownMenuItem onClick={handleApprove}>Resolved</DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled>Already Approved</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


