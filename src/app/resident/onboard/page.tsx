"use client";
import { UserButton } from "@clerk/nextjs";

export default function OnboardPage() {
  return (
    <div className="p-6">
      <div className="flex justify-end">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>

      <h1 className="text-xl font-semibold mt-6">Welcome! Let’s Get You Onboarded.</h1>
      <p className="text-gray-600 mt-2">
        Please fill in your apartment info to complete your registration.
      </p>

      {/* Your onboarding form goes here */}
    </div>
  );
}
