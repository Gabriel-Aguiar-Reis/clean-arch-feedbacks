async function fetchUsers() {
  const res = await fetch(`${process.env.NEXT_API_URL}/users`)
  if (!res.ok) throw new Error('Error to fetch users!')
  return res.json()
}

export { fetchUsers }
