"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, } from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";

const formSchema = z.object({
  clerkId: z.string().min(1, "Clerk ID is required"),
  fullName: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  Contactnumber: z.string().min(1, "Contact number is required"),
  apartmentNumber: z.string().min(1, "Apartment number is required"),
  moveInDate: z.string().min(1, "Date is required"),
  image: z.custom<File>((file) => file instanceof File && file.size > 0, {
    message: "Image is required",
  }),
});



export default function OnboardPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clerkId: "",
      fullName: "",
      email: "",
      Contactnumber: "",
      apartmentNumber: "",
      moveInDate: "",

    },
  });
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const registration = useQuery(api.users.current)
  useEffect(() => {
    if (registration) {
      form.setValue("clerkId", registration.clerkId);
      form.setValue("email", registration.email);
    }
  }, [registration,form]);


  // image upload 

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl)
  const createResident = useMutation(api.onboarduser.CreateOnboardUser);

async function uploadImage(file: File) {
  const url = await generateUploadUrl();

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": file.type, 
    },
    body: file, 
  });

  if (!result.ok) {
    console.error("Upload failed:", result.statusText);
    return null;
  }

  try {
    const json = await result.json(); 
    console.log("✅ Parsed upload result:", json);
    return json.storageId;
  } catch (e) {
    console.error(" Failed to parse upload result:", e);
    return null;
  }
}





  async function onSubmit(values: z.infer<typeof formSchema>) {
    const storageId = await uploadImage(values.image);
    if (!storageId) {
      console.error(" Image upload failed");
      return; 
    }
    await createResident({
      clerkId: values.clerkId,
      fullName: values.fullName,
      email: values.email,
      Contactnumber: values.Contactnumber,
      apartmentNumber: values.apartmentNumber,
      moveInDate: values.moveInDate,
      isAdminApproved: false,
      imageStorageId: storageId, 
    });

    form.reset();
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    console.log(values);
  }

  return (
    <>

      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Welcome! Let’s Get You Onboarded.</h1>
            <p className="text-gray-600 mt-2">
              Please fill in your apartment info to complete your registration.
            </p>
          </div>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>

      <div className="flex justify-center items-center m-2">
        <div className="w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="clerkId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0">ClerkId</FormLabel>
                    <FormControl>
                      <Input placeholder="Clerk ID" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name="fullName" // 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Asad Ali" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name="Contactnumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0">Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="03231219134" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name="apartmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0">Appartment Number</FormLabel>
                    <FormControl>
                      <Input placeholder="A012" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name="moveInDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0">Move In Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="25-12-24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0">House Papers Image</FormLabel>
                    <FormControl>
                      <Input
                        name={field.name}
                        ref={(e) => {
                          field.ref(e);
                          imageInputRef.current = e;
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("image", file, { shouldValidate: true });

                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />






              {/* Add more fields here */}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>

      </div>
    </>
  );
}
