"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import DropDown from "../../../Custom-Components/DropDown";
import Image from "next/image";

export default function StudentPage() {
    const { id } = useParams(); // Get dynamic route param

    const resident = useQuery(api.onboarduser.getResidentById, {
        id: id as Id<"residentOnboardDetails">,
    });

    if (resident === undefined) return <p>Loading...</p>;
    if (resident === null) return <p>No student found.</p>;

    return (
        <div className='flex items-center justify-center'>
            <Card className='w-[600px]'>
                <CardHeader>
                    <CardTitle className="underline pb-4">Resident Details</CardTitle>
                    <CardDescription><strong className="text-black">Name: </strong> {resident.fullName}</CardDescription>
                    <CardDescription><strong className="text-black">Email: </strong> {resident.email}</CardDescription>
                    <CardDescription><strong className="text-black">Contact Number: </strong> {resident.Contactnumber}</CardDescription>
                    <CardDescription><strong className="text-black">Apartment Number: </strong> {resident.apartmentNumber}</CardDescription>
                    <CardDescription><strong className="text-black">Move-In Date: </strong> {resident.moveInDate}</CardDescription>
                    <CardDescription>
                        <div className="mt-5 flex flex-col">
                              <strong className="text-black mb-2">Image:</strong>{" "}
                        {resident.imageUrl && resident.imageUrl.startsWith("https://") ? (
                            <Image
                                src={resident.imageUrl}
                                alt="Resident"
                                width={64}
                                height={64}
                                className=" object-cover rounded cursor-pointer"
                                onClick={() => {
                                    if (resident.imageUrl) {
                                        window.open(resident.imageUrl, "_blank")
                                    }

                                }
                                }

                            />

                        ) : (
                            <div className="text-xs text-gray-400">No Image</div>
                        )}
                        </div>
                      
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between">
                        <strong className="text-black mt-1">Status</strong>
                        <DropDown status={resident.isAdminApproved} id={resident._id} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center w-full">
                    <Button asChild>
                        <Link href="/admin/dashboard">
                            <ArrowLeft />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
