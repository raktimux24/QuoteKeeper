// app/dashboard/loading.tsx
import { Skeleton } from "@/app/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 p-4">
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}