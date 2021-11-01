import { ReactNode } from "react";
import { CartProvider } from "./Cart";
import { UserProvider } from "./User";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <UserProvider>
    <CartProvider>{children}</CartProvider>
  </UserProvider>
);

export default Providers;
