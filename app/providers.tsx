// app/providers.tsx
"use client";
import { WishlistProvider, CartProvider, LanguageProvider } from "@/lib/context";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        <LanguageProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#FFF9FB",
                color: "#212121",
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                padding: "16px 20px",
                fontFamily: "var(--FONT-STACK-PARA)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              },
            }}
          />
        </LanguageProvider>
      </CartProvider>
    </WishlistProvider>
  );
}