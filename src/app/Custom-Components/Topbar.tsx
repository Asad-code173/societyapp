'use client';

import { UserButton } from "@clerk/nextjs";

type Props = {
//   email: string;
  role: string;
};

const Topbar = ({  role }: Props) => {
  return (
    <header className="bg-[#fff] w-full h-16 sticky top-0 shadow-sm flex items-center justify-end px-6">
     

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-gray-800 font-medium capitalize">{role}</p>
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
};

export default Topbar;
