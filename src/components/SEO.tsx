import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
}

export function SEO({ title, description, keywords, path }: SEOProps) {
  const url = path 
    ? `https://sleepcalculater.online${path}` 
    : (typeof window !== 'undefined' ? `https://sleepcalculater.online${window.location.pathname}` : 'https://sleepcalculater.online');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
