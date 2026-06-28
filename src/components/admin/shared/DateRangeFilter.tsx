import type { LucideIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterOption {
  key: string;
  label: string;
}

export interface DateRangeFilterProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<{ key: T; label: string }>;
  /** Optional leading icon inside the trigger. */
  icon?: LucideIcon;
  ariaLabel?: string;
  className?: string;
  placeholder?: string;
}

/**
 * Generic select-based filter. Used for date ranges, search types, and any
 * other single-choice admin filter so the styling stays consistent.
 */
export function DateRangeFilter<T extends string = string>({
  value,
  onChange,
  options,
  icon: Icon,
  ariaLabel,
  className = "w-[150px]",
  placeholder,
}: DateRangeFilterProps<T>) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger className={className} aria-label={ariaLabel}>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.key} value={o.key}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
