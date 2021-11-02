import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { CartProvider } from "./Cart";
import { UserProvider } from "./User";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <ChakraProvider>
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  </ChakraProvider>
);

export default Providers;
