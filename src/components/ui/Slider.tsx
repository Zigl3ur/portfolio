import { Slider as BaseSlider } from "@base-ui/react/slider";
import type {
  SliderControlProps,
  SliderIndicatorProps,
  SliderThumbProps,
  SliderTrackProps as BaseSliderTrackProps
} from "@base-ui/react/slider";
import { cn } from "../../lib/cn";

export function SliderControl({
  className,
  children,
  ...props
}: SliderControlProps) {
  return (
    <BaseSlider.Control
      {...props}
      className={cn(
        "flex touch-none select-none",
        "data-[orientation=horizontal]:items-center data-[orientation=horizontal]:py-3",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:justify-center",
        className
      )}
    >
      {children}
    </BaseSlider.Control>
  );
}

interface SliderTrackProps extends BaseSliderTrackProps {
  bufferedValue?: number;
}

export function SliderTrack({
  bufferedValue,
  className,
  children,
  ...props
}: SliderTrackProps) {
  return (
    <BaseSlider.Track
      {...props}
      className={cn(
        "bg-background relative select-none",
        "data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
        className
      )}
    >
      {bufferedValue != null && (
        <div
          className="absolute h-full bg-white/15 select-none"
          style={{ width: `${bufferedValue}%` }}
        />
      )}

      {children}
    </BaseSlider.Track>
  );
}

export function SliderIndicator({ className, ...props }: SliderIndicatorProps) {
  return (
    <BaseSlider.Indicator
      {...props}
      className={cn(
        "bg-lime-bright select-none",
        "data-[orientation=horizontal]:h-full",
        "data-[orientation=vertical]:bottom-0 data-[orientation=vertical]:w-full",
        className
      )}
    />
  );
}

export function SliderThumb({ className, ...props }: SliderThumbProps) {
  return (
    <BaseSlider.Thumb
      {...props}
      className={cn(
        "border-gray bg-muted data-dragging:bg-background-bright size-3.5 border border-dashed select-none",
        className
      )}
    />
  );
}
