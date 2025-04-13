import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export function UserAvatar({
  name,
  className
}: {
  name: string
  className?: string
}) {
  return (
    <Avatar className={cn('h-12 w-fit', className)}>
      <AvatarImage src={`/avatars/${name}.png`} alt={`${name}-profile`} />
    </Avatar>
  )
}
