const baseUrl = process.env.NEXT_PUBLIC_API_URL

async function fetchUsers() {
  const res = await fetch(`${baseUrl}/users`)
  if (!res.ok) throw new Error('Error to fetch users!')
  return res.json()
}

export { fetchUsers }
