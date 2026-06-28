import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  /** Number of stat-card skeletons in the top row. */
  cards?: number;
  /** Column count for the stat-card grid. */
  cardColumns?: 4 | 6;
  /** Number of full-width chart/table skeletons below the cards. */
  blocks?: number;
  blockHeight?: string;
  className?: string;
}

/**
 * Reusable skeleton loader for admin pages. Defaults approximate the common
 * "stat cards + content blocks" layout.
 */
export function LoadingState({
  cards = 4,
  cardColumns = 4,
  blocks = 1,
  blockHeight = "h-[340px]",
  className,
}: LoadingStateProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {cards > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2",
            cardColumns === 6 ? "lg:grid-cols-3 xl:grid-cols-6" : "lg:grid-cols-4",
          )}
        >
          {Array.from({ length: cards }).map((_, i) => (
            <Skeleton key={i} className="h-[116px] rounded-xl" />
          ))}
        </div>
      )}
      {Array.from({ length: blocks }).map((_, i) => (
        <Skeleton key={i} className={cn("w-full rounded-xl", blockHeight)} />
      ))}
    </div>
  );
}
