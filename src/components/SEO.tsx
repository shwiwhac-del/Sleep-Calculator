import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

export function SEO({ title, description, path }: SEOProps) {
  const url = path 
    ? `https://sleepcalculater.online${path}` 
    : (typeof window !== 'undefined' ? `https://sleepcalculater.online${window.location.pathname}` : 'https://sleepcalculater.online');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
