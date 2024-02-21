"use client";

import { AppConnections } from "@/components/AppConnections";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "flowbite-react";
import { BsUpload } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log(file);
      }
    };
    input.click();
  };
  return (
    <main className="flex">
      <AppLayout connections={<AppConnections />}>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Documents</h1>
          <div className="flex flex-row gap-2">
            <Button onClick={onUpload}>
              <BsUpload />
            </Button>
            <Button color="failure">
              <MdDelete />
            </Button>
          </div>
        </div>
      </AppLayout>
    </main>
  );
}
