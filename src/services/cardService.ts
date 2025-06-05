export async function fetchSampleCards() {
  const res = await fetch('http://localhost:3000/api/cards/sample');
  if (!res.ok) throw new Error('Failed to fetch cards');
  return res.json();
}
