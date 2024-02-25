import React, { useEffect, useState } from "react";
import { User2 } from "lucide-react";
import axios from "axios";

const LayoutCards = ({ icon, title, url }) => {
  const [data, setData] = useState([]);

  // fetch data from server
  async function fetchData() {
    const response = await axios.get(url);
    setData(response.data.data);
    console.log("layout card ", response.data.data);
  }

  // call the fetch data function
  useEffect(() => {
    fetchData();
  });
  return (
    <div className="w-[15rem] h-[10rem] text-white bg-[#5e2aee] border border-gray-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100 rounded-md cursor-pointer flex items-center justify-center">
      <div>
        <div className="border w-[35px] p-1  border-indigo-500 rounded">
          <User2 />
        </div>
        <p className="font-semibold mt-3 capitalize">{title}</p>
        <p className="mt-3 text-xl font-bold capitalize">{data}</p>
      </div>
    </div>
  );
};

export default LayoutCards;
