import React from "react";

type SessionContext = {
  session: any;
};

const initialValue: SessionContext = {
  session: null,
};

export const SessionContext =
  React.createContext<SessionContext>(initialValue);
