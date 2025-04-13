import { Skeleton } from '@/components/ui/skeleton'

function SkeletonFeedbackList() {
  return (
    <div className="mb-4 h-24 space-x-4 rounded bg-white p-4 shadow-md">
      <div className="flex items-center">
        <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
        <div className="space-y-2 pl-2">
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>
      </div>
      <div className="pl-4 pt-2">
        <Skeleton className="h-4 w-72 bg-gray-200" />
      </div>
    </div>
  )
}

export default SkeletonFeedbackList
