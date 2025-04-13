'use client'

import SkeletonUsersHeader from '@/components/SkeletonUsersHeader'
import { Card, CardContent } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { UserAvatar } from '@/components/UserAvatar'

import User from '@/lib/interfaces/User'
import { fetchUsers } from '@/services/usersService'
import { useQuery } from '@tanstack/react-query'

export function UsersHeader() {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })
  return (
    <div className="flex h-fit max-w-60 flex-col gap-2 rounded-2xl bg-zinc-100 p-4">
      <h1 className="scroll-m-20 pl-4 text-2xl font-extrabold tracking-tight lg:text-3xl">
        Coworkers
      </h1>
      <p className="text-center">
        Hover over the coworker to learn more about them.
      </p>
      {usersLoading && (
        <>
          <SkeletonUsersHeader />
          <SkeletonUsersHeader />
          <SkeletonUsersHeader />
          <SkeletonUsersHeader />
        </>
      )}
      {usersError && <p>Error to load coworkers.</p>}
      {users &&
        users.map((user) => (
          <HoverCard key={user.id} closeDelay={500}>
            <HoverCardTrigger>
              <Card className="rounded-xl border border-gray-200 bg-white p-2 shadow-md hover:bg-zinc-50">
                <CardContent className="flex flex-row justify-between px-2">
                  <div className="flex flex-row items-center gap-4">
                    <UserAvatar
                      key={user.id}
                      name={`${user.firstName}-${user.lastName}`}
                    />
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent
              className="mt-4 w-96 border border-gray-200 bg-white shadow-md"
              side="right"
            >
              <h1 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="pl-4">{user.description}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
    </div>
  )
}
