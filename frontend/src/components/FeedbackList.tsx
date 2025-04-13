'use client'

import { StarRating } from '@/components/StarRating'
import { Dot } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Feedback from '@/lib/interfaces/Feedback'
import User from '@/lib/interfaces/User'
import clsx from 'clsx'
import { UserAvatar } from '@/components/UserAvatar'
import { fetchUsers } from '@/services/usersService'
import { fetchFeedbacks } from '@/services/feedbacksService'
import SkeletonFeedbackList from '@/components/SkeletonFeedbackList'

export function FeedbackList() {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  const {
    data: feedbacks,
    isLoading: feedbacksLoading,
    isError: feedbacksError
  } = useQuery<Feedback[]>({
    queryKey: ['feedbacks'],
    queryFn: fetchFeedbacks
  })

  return (
    <div className="h-fit w-auto rounded-2xl p-4">
      {usersLoading && (
        <>
          <SkeletonFeedbackList />
          <SkeletonFeedbackList />
          <SkeletonFeedbackList />
          <SkeletonFeedbackList />
        </>
      )}
      {usersError && <p>Error to load coworkers.</p>}
      {users?.map((user) => (
        <div
          className="mb-2 rounded border border-gray-200 bg-white p-4 shadow-md"
          key={user.id}
        >
          <div className="flex flex-row items-center gap-2">
            <UserAvatar
              key={user.id}
              name={`${user.firstName}-${user.lastName}`}
              className="h-8"
            />
            <h1 className="text-xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
          </div>
          <div>
            {feedbacksLoading && <p>loading feedbacks...</p>}
            {feedbacksError && <p>Error to load feedbacks.</p>}
            {feedbacks?.map(
              (feedback) =>
                feedback.userId === user.id && (
                  <div
                    key={feedback.id}
                    className="mb-2 flex flex-row justify-between"
                  >
                    <div
                      key={feedback.id}
                      className="flex flex-row items-start gap-2"
                    >
                      <Dot className={clsx('h-6 w-6 pl-2')} />
                      <p className="max-w-2xl text-sm">{feedback.comment}</p>
                    </div>
                    <StarRating.Root value={feedback.rating} readOnly>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarRating.Star key={star} starValue={star} />
                      ))}
                    </StarRating.Root>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
