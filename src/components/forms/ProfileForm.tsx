import { Button } from "flowbite-react";
import { Input } from "../Input";
import { TextArea } from "../Textarea";

export function ProfileForm() {
  return (
    <div className="px-4 mx-auto max-w-2xl">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Profile</h2>
      <form action="#">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <Input autoComplete="off" type="text" required />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Last name
            </label>
            <Input autoComplete="off" type="text" required />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Business
            </label>
            <Input autoComplete="off" type="text" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Position name
            </label>
            <Input autoComplete="off" type="text" required />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Url
            </label>
            <Input autoComplete="off" type="text" required />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <TextArea rows={6} placeholder="Your description here" />
          </div>
        </div>
        <div className="pt-4">
          <Button type="submit" className="w-[100px] rounded-none">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
