import React, { PropsWithChildren, useState } from "react";

type MenuContext = {
  toggle(): void;
  isOpen: boolean;
};

const initialValue: MenuContext = {
  isOpen: false,
  toggle() {},
};

export const MenuContext = React.createContext<MenuContext>(initialValue);

export const MenuContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <MenuContext.Provider value={{ isOpen, toggle }}>
      {children}
    </MenuContext.Provider>
  );
};
