import type { LucideIcon } from "lucide-react";

export interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Optional controls (filters, buttons) rendered on the right. */
  actions?: React.ReactNode;
}

/**
 * Standard page title block used at the top of every admin page.
 */
export function PageHeader({ icon: Icon, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
