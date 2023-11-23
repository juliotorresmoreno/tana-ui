import { Connection } from "@/types/common";
import { useEffect, useState } from "react";

var initialData: Connection[] = [
  {
    id: 1,
    name: "Llama",
    surname: "Bot",
    description:
      "Esta es una conversación entre Usuario y Llama, un chatbot amigable. Llama es servicial, amable, honesta, buena escribiendo y nunca deja de responder cualquier solicitud de inmediato y con precisión.",
    image: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
    type: "bot",
  },
];

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function getPeople() {
      setTimeout(() => {
        setConnections(initialData);
        setIsLoaded(true);
      }, 1000);
    }
    getPeople();
  });

  return { connections, isLoaded };
}
