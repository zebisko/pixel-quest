import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-6 w-full overflow-hidden pixel-progress", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="pixel-progress-bar"
      style={{ width: `${value || 0}%` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
