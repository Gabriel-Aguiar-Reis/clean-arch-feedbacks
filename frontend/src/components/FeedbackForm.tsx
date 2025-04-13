'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { StarRating } from '@/components/StarRating'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import User from '@/lib/interfaces/User'
import { fetchUsers } from '@/services/usersService'
import { submitFeedback } from '@/services/feedbacksService'

const formSchema = z.object({
  userId: z.string().min(1, 'Choose a coworker!'),
  comment: z.string().min(5, 'Comment must have at least 5 characters!'),
  rating: z.number().min(1, 'Choose a rating between 1 and 5!')
})

type FeedbackFormValues = z.infer<typeof formSchema>

export function FeedbackForm() {
  const queryClient = useQueryClient()

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      comment: '',
      rating: 0
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: FeedbackFormValues) => {
      await submitFeedback(data)
    },
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] })
    }
  })

  const onSubmit = async (values: FeedbackFormValues) => {
    await toast.promise(mutation.mutateAsync(values), {
      loading: 'Sending feedback...',
      success: 'Feedback successfully sent!',
      error: 'An error has occur to send feedback.'
    })
  }

  return (
    <div className="mb-4 flex flex-row justify-between">
      <Card className="w-sm h-fit border border-gray-200 p-4 shadow-md">
        <CardTitle className="text-xl font-bold">Feedback Form</CardTitle>
        <CardDescription>
          Evaluate the work performed by your coworkers in the last week!
        </CardDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md space-y-6"
          >
            {/* User Select */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coworker</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select a coworker">
                          {users?.map(
                            (user) =>
                              user.id.toString() === field.value.toString() &&
                              `${user.firstName} ${user.lastName}`
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-50 border border-gray-200 bg-white shadow-md focus-visible:ring-0">
                      {usersLoading && <p>loading coworkers...</p>}
                      {usersError && <p>Error to load coworkers.</p>}
                      {users &&
                        users.map((user) => (
                          <SelectItem
                            className="hover:bg-gray-100"
                            key={user.id}
                            value={user.id.toString()}
                          >
                            {user.firstName} {user.lastName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-200 focus-visible:ring-0"
                      {...field}
                      placeholder="Write your feedback here..."
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Star Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <StarRating.Root
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarRating.Star key={star} starValue={star} />
                      ))}
                    </StarRating.Root>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              className="border border-gray-200"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Sending...' : 'Send Feedback'}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
