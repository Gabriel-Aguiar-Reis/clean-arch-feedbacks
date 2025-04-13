async function fetchFeedbacks() {
  const res = await fetch(`${process.env.API_URL}/feedbacks`)
  if (!res.ok) throw new Error('Error to fetch feedbacks!')
  return res.json()
}

async function submitFeedback(data: {
  userId: string
  comment: string
  rating: number
}) {
  const res = await fetch(`${process.env.API_URL}/feedbacks`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.message || 'Error to send feedback!')
  }

  return res.json()
}

export { fetchFeedbacks, submitFeedback }
