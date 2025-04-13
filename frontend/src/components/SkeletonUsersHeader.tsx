import { Skeleton } from '@/components/ui/skeleton'

function SkeletonUsersHeader() {
  return (
    <div className="flex items-center space-x-4 rounded bg-white p-2 shadow-md">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
      <div className="space-y-2">
        <Skeleton className="w-26 h-4 bg-gray-200" />
      </div>
    </div>
  )
}

export default SkeletonUsersHeader
