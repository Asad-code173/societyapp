'use client';

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Props = {
  role: string;
};

const Topbar = ({ role }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure rendering only happens on the client
  }, []);

  return (
    <header className="bg-[#fff] w-full h-16 sticky top-0 shadow-sm flex items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-gray-800 font-medium capitalize">{role}</p>
        </div>
        {isClient && <UserButton afterSignOutUrl="/sign-in" />}
      </div>
    </header>
  );
};

export default Topbar;
