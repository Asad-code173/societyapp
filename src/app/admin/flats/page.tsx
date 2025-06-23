import React from 'react'
import Card from "@/app/Custom-Components/DashboardCard";
import { MdApartment } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";  
import { TbHomeOff } from "react-icons/tb";  

const page = () => {
  return (
    <>
        <div className="pr-20">
        <div className="flex justify-between space-x-4">

        <Card
          title="Total Flats"
          value="20"
          icon={<MdApartment />}
        />
        <Card
          title="Occupied Flats"
          value="5"
          icon={<AiOutlineTeam />}
        />
        <Card
          title="Empty Flats"
          value={15}
          icon={<TbHomeOff />}
          footer="Tap to view details"
        />

      </div>
    </div>
    </>
  )
}

export default page
