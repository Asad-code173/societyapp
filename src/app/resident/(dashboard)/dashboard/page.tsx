"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../convex/_generated/api";
import { useMutation, } from "convex/react";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object({

  fullName: z.string().min(1, "Name is required"),
  ContactNumber: z.string().min(1, "Contact number is required"),
  apartmentNumber: z.string().min(1, "Apartment number is required"),
  complaint:z.string().max(100,"Message is Required")
  
 
});



export default function ResidentDashboard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      ContactNumber: "",
      apartmentNumber: "",
      complaint:"",
 

    },
  });
 

const complain = useMutation(api.complaint.CreateComplain)
 

  



  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    await complain({
      fullName: values.fullName,
      ContactNumber: values.ContactNumber,
      apartmentNumber: values.apartmentNumber,
      Message:values.complaint,
      Status:false,
    });

    form.reset();
   
    console.log(values);
  }

  return (
    <>

        <div className="p-6">
        

        <h1 className="text-xl font-semibold mt-6">Welcome! We are here to Help you Out.</h1>
        <p className="text-gray-600 mt-2">
          Please fill the form so that we can tackle your Complain.
        </p>


      </div>
      <div className="flex justify-center items-center m-2">
        <div className="w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                name="ContactNumber"
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
                name="complaint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Complaint</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your issue in detail..."
                        className="resize-none"
                        rows={5}
                        {...field}
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
