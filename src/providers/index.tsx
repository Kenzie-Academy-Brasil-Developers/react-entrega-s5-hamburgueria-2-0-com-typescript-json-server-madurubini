import { ReactNode } from "react";
import { CartProvider } from "./Cart";
import { UserProvider } from "./User";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <CartProvider>
    <UserProvider>{children}</UserProvider>
  </CartProvider>
);

export default Providers;
