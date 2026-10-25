import {
  Tabs as TabsPrimitive,
  type TabsListProps,
  type TabsPanelProps,
  type TabsRootProps,
  type TabsTabProps
} from "@base-ui/react/tabs";
import { cn } from "../../lib/cn";
import { useEffect, useRef, useState } from "react";

export function TabsRoot({
  children,
  className,
  onValueChange,
  ...props
}: TabsRootProps) {
  const [scrollKey, setScrollKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const root = scrollRef.current;
      if (!root) return;

      const active = root.querySelector<HTMLElement>(
        "[data-tab-trigger][data-active]"
      );

      active?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    });

    return () => cancelAnimationFrame(id);
  }, [scrollKey]);

  return (
    <TabsPrimitive.Root
      ref={scrollRef}
      className={cn("flex flex-col gap-2", className)}
      onValueChange={(value, eventDetails) => {
        setScrollKey((key) => key + 1);
        onValueChange?.(value, eventDetails);
      }}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        "bg-background border-gray no-scrollbar flex max-w-fit gap-1 overflow-x-auto border border-dashed p-1",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ children, className, ...props }: TabsTabProps) {
  return (
    <TabsPrimitive.Tab
      data-tab-trigger
      className={cn(
        "text-foreground/70 hover:bg-gray/40 hover:text-foreground data-active:bg-gray/80 active:bg-gray/60 data-active:text-foreground px-2 py-1 text-center text-sm whitespace-nowrap transition-colors duration-200 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Tab>
  );
}

export function TabsContent({ children, className, ...props }: TabsPanelProps) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        "border-gray bg-background border border-dashed p-4",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}
