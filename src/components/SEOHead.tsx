import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/images/seo/og-questionnaire.svg',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}: SEOHeadProps) {
  const keywordsString = keywords.join(', ');
  
  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content="Love on the Brain" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Love on the Brain" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@loveonthebrain" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Meta tags adicionales para SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": canonicalUrl,
          "publisher": {
            "@type": "Organization",
            "name": "Love on the Brain",
            "url": "https://loveonthebrain.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://loveonthebrain.com/logo.png"
            }
          },
          "mainEntity": {
            "@type": "Questionnaire",
            "name": "Cuestionario de Compatibilidad de Pareja",
            "description": "Test psicológico para encontrar pareja ideal",
            "provider": {
              "@type": "Organization",
              "name": "Love on the Brain",
              "description": "Empresa psico-social e integradora social especializada en compatibilidad de parejas"
            }
          }
        })}
      </script>
    </Helmet>
  );
}

