async function fetchUsers() {
  const res = await fetch('http://localhost:3000/users')
  if (!res.ok) throw new Error('Error to fetch users!')
  return res.json()
}

export { fetchUsers }
