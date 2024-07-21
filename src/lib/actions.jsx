
export async function fetchProblems() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-problems`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch problems');
  }
  const data = await response.json();
  return data;
}
