import React, { useState } from "react";
import Empcard from "../components/Empcard";
import useLongPolling from "../hooks/useLongPolling";

const Station = () => {
  const today = new Date();
  const currentdate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
 

  const data = useLongPolling(
    `http://localhost:5000/api/station/${currentdate}`,
    1000
  );

  console.log(data);
  const [date, setDate] = useState("");
  return (
    <div>
      <div className="w-full my-3 flex justify-between px-6 mx-auto">
        <h1 className="text-2xl font-semibold">Station</h1>
        <div className="flex gap-2">
          <div class="relative max-w-sm">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              datepicker
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>

          <button className="bg-[#3538A1] text-white px-2 py-1 rounded-md">
            Search
          </button>
        </div>
      </div>
      {data.length == 0 && (
        <p className="text-center text-2xl font-semibold">No data found</p>
      )}
      {data.length != 0 && (
        <section class="container mx-auto p-6 font-mono">
          <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div class="w-full overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th class="px-4 py-3">Station_Number</th>
                    <th class="px-4 py-3">Work_count</th>
                    <th class="px-4 py-3">Date</th>
                  </tr>
                </thead>

                <tbody class="bg-white">
                  {data?.map((station) => {
                    return (
                      <tr class="text-gray-700">
                        <td class="px-4 py-3 border">
                          <div class="flex items-center text-sm">
                            <div>
                              <p class="font-semibold">{station.Station_Number}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 border text-md font-semibold">
                          {station.work_count}
                        </td>
                        <td class="px-4 py-3 border text-sm">{currentdate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Station;
