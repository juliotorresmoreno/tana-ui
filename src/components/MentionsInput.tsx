import { InputHTMLAttributes, useState } from "react";
import { Input } from "./Input";

interface MentionsInput extends InputHTMLAttributes<HTMLInputElement> {
  AtList: React.ReactNode;
  HashList: React.ReactNode;
  onArrowUp(): void;
  onArrowDown(): void;
}

export function MentionsInput({
  AtList,
  HashList,
  onArrowDown,
  onArrowUp,
  ...props
}: MentionsInput) {
  const [AtisOpen, setAtisOpen] = useState(false);
  const [HashisOpen, setHashisOpen] = useState(false);
  const [marginLeft, setMarginLeft] = useState("0rem");
  return (
    <>
      {AtisOpen && (
        <div
          className="p-2 absolute bg-gray-200 w-[300px]"
          style={{
            marginLeft: marginLeft,
            transform: "translateY(calc(-5px - 100%))",
            textOverflow: "ellipsis",
          }}
        >
          {AtList}
        </div>
      )}
      {HashisOpen && (
        <div
          className="p-2 absolute bg-gray-200 w-[300px]"
          style={{
            marginLeft: marginLeft,
            transform: "translateY(calc(-5px - 100%))",
            textOverflow: "ellipsis",
          }}
        >
          {HashList}
        </div>
      )}
      <Input
        type="text"
        autoComplete="off"
        {...props}
        style={{ fontFamily: "Fira Code" }}
        onKeyDown={(evt) => {
          if (evt.key === "Backspace") {
            const target = evt.target as HTMLInputElement;
            const current = target.value.substring(
              (target.selectionStart ?? 0) - 1,
              target.selectionStart ?? 0
            );
            if (["@", "#"].includes(current)) {
              setAtisOpen(false);
              setHashisOpen(false);
            }
          } else if (evt.key === "ArrowUp") {
            evt.preventDefault();
            onArrowUp();
          } else if (evt.key === "ArrowDown") {
            evt.preventDefault();
            onArrowDown();
          }
          
          if (props.onKeyDown) props.onKeyDown(evt);
        }}
        onKeyUp={(evt) => {
          if (evt.key === "@") {
            setMarginLeft((evt.target as any).selectionStart * 0.525 + "rem");
            setAtisOpen(true);
            setHashisOpen(false);
          } else if (evt.key === "#") {
            setMarginLeft((evt.target as any).selectionStart * 0.525 + "rem");
            setAtisOpen(false);
            setHashisOpen(true);
          } else if (evt.key === " ") {
            setAtisOpen(false);
            setHashisOpen(false);
          }
        }}
      />
    </>
  );
}
