import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import MobileSidebar from "@/features/sidebar/pages/MobileSidebar";

import type { Notification } from "@/interfaces/notification";

type Props = {
  notifications: Notification[];
};

export default function MobileNavbar({
  notifications,
}: Props) {
  return (
    <header
      className="
        md:hidden
        sticky
        top-0
        z-50
        flex
        h-14
        items-center
        justify-left
        gap-2
        border-b
        border-white/10
        bg-gradient-to-br
        from-black
        via-slate-950
        to-black
        px-4
        text-white
      "
    >
      <Sheet>

        {/* Open menu button */}

        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="
              text-white
              hover:bg-white/10
              hover:text-white
            "
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        {/* Drawer */}

        <SheetContent
          side="left"
          className="
            w-72
            p-0
            border-r
            border-white/10
            bg-gradient-to-br
            from-black
            via-slate-950
            to-black
            text-white
          "
        >
          <SheetHeader className="sr-only">

            <SheetTitle>
              Navigation Menu
            </SheetTitle>

            <SheetDescription>
              Navigate through TaskFlow sections.
            </SheetDescription>

          </SheetHeader>

          <MobileSidebar
            notifications={notifications}
          />

        </SheetContent>

      </Sheet>

      {/* Logo */}

      <h1
        className="
          left
          text-lg
          font-bold
          tracking-tight
        "
      >
        TaskFlow
      </h1>

      {/* Spacer for centering */}

      <div className="w-10" />

    </header>
  );
}