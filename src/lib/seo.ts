/**
 * Generates the clean absolute canonical URL for the given pathname.
 * Prevents trailing slashes, case mismatches, or query parameters from creating duplicate content issues.
 */
export function getCanonicalUrl(pathname: string): string {
  // Normalize the pathname to lowercase
  let normalizedPath = pathname.toLowerCase();
  
  // Strip any trailing slash unless it's the root path "/"
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  
  // Return the correct absolute canonical URL for the active route
  return `https://sleepcalculater.online${normalizedPath}`;
}
