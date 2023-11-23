import React from "react";

type MenuContext = {
  toggle(): void;
  isOpen: boolean;
};

const initialValue: MenuContext = {
  isOpen: false,
  toggle() {},
};

export const MenuContext = React.createContext<MenuContext>(initialValue);
