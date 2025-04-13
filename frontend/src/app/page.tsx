import { FeedbackForm } from '@/components/FeedbackForm'
import { FeedbackList } from '@/components/FeedbackList'
import { UsersHeader } from '@/components/UsersHeader'

export default function Home() {
  return (
    <div className="flex h-screen flex-row">
      <div className="flex w-3/5 flex-col p-4">
        {/* Coluna esquerda */}
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Anonymous Feedback 🤫
        </h1>
        <div className="mt-4 flex flex-row justify-between gap-4 overflow-y-auto px-8">
          <UsersHeader />
          <FeedbackForm />
        </div>
      </div>
      {/* Coluna direita com scroll */}
      <div className="h-full w-2/5 overflow-y-auto bg-zinc-100 pr-2 pt-8">
        <h1 className="scroll-m-20 pl-4 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Feedback List
        </h1>
        <FeedbackList />
      </div>
    </div>
  )
}
