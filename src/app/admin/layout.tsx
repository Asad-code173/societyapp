// src/app/admin/layout.tsx
import Sidebar from "../Custom-Components/Sidebar";
import Topbar from "../Custom-Components/Topbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    //   const email = user.emailAddresses[0]?.emailAddress || "";
      const role = typeof user.publicMetadata.role === 'string' ? user.publicMetadata.role : 'resident';


    return (
        <div className=" min-h-screen bg-[#F3F4F6]">
            <Topbar role={role} />

            <div className="flex">
                <Sidebar />
                <div className='ml-4 sm:ml-64 mt-4 w-full'>
                    <main className="p-6">{children}</main>
                </div>

            </div>
        </div>
    );
}
