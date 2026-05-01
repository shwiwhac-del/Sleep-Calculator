export function generateSeoSlug(title: string): string {
  const stopWords = new Set([
    'how', 'does', 'your', 'the', 'a', 'an', 'is', 'what', 'why', 'on', 'in', 'at', 'to', 'for', 'of', 'and', 'or', 'with', 'using', 'benefits'
  ]);

  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .split(/\s+/) // Split by whitespace
    .filter(word => !stopWords.has(word)) // Remove stop words
    .join('-'); // Join with hyphens
}
