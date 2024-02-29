import { Button, Label, Modal } from "flowbite-react";
import { Input } from "../Input";
import { TextArea } from "../Textarea";

interface MmluFormProps {
  open: boolean;
  toggle: () => void;
}

export function MmluForm({ open, toggle }: MmluFormProps) {
  const handleSave = () => {
    toggle();
  };

  return (
    <Modal show={open} onClose={toggle}>
      <Modal.Header>Mmlu</Modal.Header>
      <Modal.Body>
        <form className="flex w-full flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Name" />
            </div>
            <Input type="text" autoComplete="off" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="PhotoURL" />
            </div>
            <Input type="url" autoComplete="off" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Description" />
            </div>
            <TextArea rows={5} autoComplete="off" required />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="rounded-none w-[100px]" onClick={handleSave}>
          Save
        </Button>
        <Button
          className="rounded-none w-[100px]"
          color="gray"
          onClick={toggle}
        >
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
