import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  /** Stable column id, also used as the sort key. */
  key: string;
  header: string;
  align?: "left" | "right";
  /** Whether the column can be sorted. Defaults to true. */
  sortable?: boolean;
  /** Primitive value used for sorting. Required when sortable. */
  sortValue?: (row: T) => string | number;
  /** Default sort direction when this column is first selected. */
  defaultSortDir?: "asc" | "desc";
  /** Cell renderer. */
  cell: (row: T) => React.ReactNode;
  /** Extra classes for the cell. */
  cellClassName?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  /** Initial sort column key. */
  initialSortKey?: string;
  initialSortAsc?: boolean;
  /** When set, paginate client-side with this many rows per page. */
  pageSize?: number;
}

/**
 * Generic sortable table used across the admin panel (top queries, top pages,
 * countries, devices, etc.). Sorting is handled client-side on the supplied
 * `sortValue` accessor.
 */
export function DataTable<T>({
  columns,
  data,
  getRowKey,
  initialSortKey,
  initialSortAsc = false,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | undefined>(initialSortKey);
  const [asc, setAsc] = useState(initialSortAsc);

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp = typeof av === "string" && typeof bv === "string" ? av.localeCompare(bv) : Number(av) - Number(bv);
      return asc ? cmp : -cmp;
    });
    return copy;
  }, [columns, data, sortKey, asc]);

  const toggle = (col: DataTableColumn<T>) => {
    if (col.sortable === false || !col.sortValue) return;
    if (sortKey === col.key) {
      setAsc((p) => !p);
    } else {
      setSortKey(col.key);
      setAsc(col.defaultSortDir === "asc");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, i) => {
            const isSortable = col.sortable !== false && !!col.sortValue;
            const right = col.align === "right";
            return (
              <TableHead
                key={col.key}
                className={cn(right && "text-right", i === 0 && "pl-6", i === columns.length - 1 && "pr-6")}
              >
                {isSortable ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggle(col)}
                    className={cn("-mx-2 h-8 px-2 font-medium", right && "ml-auto")}
                  >
                    {col.header}
                    {sortKey === col.key ? (
                      asc ? (
                        <ChevronUp className="ml-1 h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="ml-1 h-3.5 w-3.5" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-40" />
                    )}
                  </Button>
                ) : (
                  col.header
                )}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((row) => (
          <TableRow key={getRowKey(row)}>
            {columns.map((col, i) => (
              <TableCell
                key={col.key}
                className={cn(
                  col.align === "right" && "text-right tabular-nums",
                  i === 0 && "pl-6",
                  i === columns.length - 1 && "pr-6",
                  col.cellClassName,
                )}
              >
                {col.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
