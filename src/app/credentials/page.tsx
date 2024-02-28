"use client";

import { AppLayout } from "@/components/AppLayout";
import { Loading } from "@/components/Loading";
import { getCredentials } from "@/services/credentials";
import { Credential } from "@/types/models";
import { Button } from "flowbite-react";
import { Suspense, useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { SiCodereview } from "react-icons/si";

export default function Page() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  useEffect(() => {
    async function getData() {
      const response = await getCredentials();
      const data = await response.json();

      setCredentials(data);
    }
    getData();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex">
        <AppLayout connections={null}>
          <div className="flex flex-1 flex-col gap-2">
            <section className="bg-gray-50 p-3 sm:p-5 flex flex-1">
              <div className="mx-auto max-w-screen-xl px-4 lg:px-12 flex flex-1">
                {/* Start coding here */}
                <div className="bg-white relative shadow-md overflow-hidden flex-1">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                      <h2 className="font-bold">Credentials</h2>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                      <Button type="button" className="rounded-none w-[150px]">
                        <svg
                          className="h-3.5 w-3.5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          />
                        </svg>
                        Generate
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 rounded-none">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="flex">
                          <th scope="col" className="px-4 py-3 flex-1">
                            Api Key
                          </th>
                          <th scope="col" className="px-4 py-3 w-[300px]">
                            Last used
                          </th>
                          <th scope="col" className="px-4 py-3 w-[300px]">
                            Created At
                          </th>
                          <th scope="col" className="px-4 py-3 w-[60px]">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {credentials.map((credential) => (
                          <tr key={credential.id} className="flex">
                            <td className="px-4 py-1 flex-1">
                              {credential.api_key}
                            </td>
                            <td className="px-4 py-1 w-[300px]">
                              {credential.last_used}
                            </td>
                            <td className="px-4 py-1 w-[300px]">
                              {credential.creation_at}
                            </td>

                            <td className="px-4 py-1 w-[60px] flex flex-row justify-end gap-2">
                              <span className="text-primary-500 cursor-pointer">
                                <SiCodereview />
                              </span>
                              <span className="text-red-700 cursor-pointer">
                                <RiDeleteBin2Fill />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </AppLayout>
      </main>
    </Suspense>
  );
}
