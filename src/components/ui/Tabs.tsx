import {
  Tabs as TabsPrimitive,
  type TabsListProps,
  type TabsPanelProps,
  type TabsRootProps,
  type TabsTabProps
} from "@base-ui/react/tabs";
import { cn } from "../../lib/cn";

export function TabsRoot({ children, className, ...props }: TabsRootProps) {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
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
        "bg-background border-gray flex w-fit gap-1 overflow-scroll border border-dashed p-1",
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
      className={cn(
        "text-foreground/70 hover:bg-gray/40 hover:text-foreground data-active:bg-gray/80 active:bg-gray/60 data-active:text-foreground px-2 py-1 text-sm transition-colors duration-200 hover:cursor-pointer",
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
