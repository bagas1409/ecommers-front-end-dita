"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/provider/SessionProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import BodyBase from "@/components/bodybase";
import Base from "@/components/base";
import ClockClient from "@/components/clockclient";
import { useAuth } from "@/hooks/useAuth";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useAuth();
  const serverTime = new Date().toISOString();

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-fit">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          {session?.user ? (
            <>
              <AppSidebar role={session?.user.role?.toLowerCase()} />
              <main className="relative w-full overflow-hidden">
                <AuthProvider>
                  <SidebarTrigger className="bg-background fixed z-30 mt-1 rounded-l-none" />
                  <div className="flex flex-row justify-end-safe">
                    <ClockClient serverTime={serverTime} />
                  </div>

                  <Base>
                    <BodyBase>{children}</BodyBase>
                  </Base>
                </AuthProvider>
              </main>
            </>
          ) : (
            <AuthProvider>
              <BodyBase>
                <main>{children}</main>
              </BodyBase>
            </AuthProvider>
          )}
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
