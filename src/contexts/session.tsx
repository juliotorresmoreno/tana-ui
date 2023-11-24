import { Session } from "@/types/models";
import React from "react";

type SessionContext = {
  session: Session | null;
  setSession(session: Session): void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
};

const initialValue: SessionContext = {
  session: null,
  setSession(session: Session) {},
  isLoading: false,
  setIsLoading: (state: boolean) => {},
};

export const SessionContext = React.createContext<SessionContext>(initialValue);
