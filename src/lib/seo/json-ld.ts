/**
 * JSON-LD Structured Data Helpers
 *
 * Schema.org helpers for generating rich search results.
 * Use with the <JsonLd> component or toJsonLd() directly.
 *
 * Usage:
 *   import { JsonLd, productLd } from '@abeedoo/radish-components';
 *   <JsonLd data={productLd(product)} />
 */

/** Wrap a schema.org object as a JSON-LD script tag string */
export function toJsonLd(data: Record<string, any>): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/** Product (e-commerce) */
export function productLd(p: {
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  brand?: string;
  sku?: string;
  images?: string[];
  availability?: 'in_stock' | 'out_of_stock' | 'preorder';
  url?: string;
}): Record<string, any> {
  const ld: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name
  };
  if (p.description) ld.description = p.description;
  if (p.brand) ld.brand = { '@type': 'Brand', name: p.brand };
  if (p.sku) ld.sku = p.sku;
  if (p.images?.length) ld.image = p.images;
  if (p.url) ld.url = p.url;
  if (p.price !== undefined) {
    const avail: Record<string, string> = {
      in_stock: 'https://schema.org/InStock',
      out_of_stock: 'https://schema.org/OutOfStock',
      preorder: 'https://schema.org/PreOrder'
    };
    ld.offers = {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: p.currency || 'USD',
      availability: avail[p.availability || 'in_stock']
    };
  }
  return ld;
}

/** Article / blog post */
export function articleLd(a: {
  title: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  url?: string;
}): Record<string, any> {
  const ld: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title
  };
  if (a.description) ld.description = a.description;
  if (a.author) ld.author = { '@type': 'Person', name: a.author };
  if (a.publishedAt) ld.datePublished = a.publishedAt;
  if (a.updatedAt) ld.dateModified = a.updatedAt;
  if (a.image) ld.image = a.image;
  if (a.url) ld.url = a.url;
  return ld;
}

/** Course (educational content) */
export function courseLd(c: {
  name: string;
  description?: string;
  instructor?: string;
  price?: number;
  currency?: string;
  url?: string;
}): Record<string, any> {
  const ld: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.name
  };
  if (c.description) ld.description = c.description;
  if (c.instructor) ld.provider = { '@type': 'Person', name: c.instructor };
  if (c.price !== undefined) {
    ld.offers = {
      '@type': 'Offer',
      price: c.price,
      priceCurrency: c.currency || 'USD'
    };
  }
  if (c.url) ld.url = c.url;
  return ld;
}

/** Organization / company */
export function organizationLd(o: {
  name: string;
  url?: string;
  logo?: string;
  description?: string;
}): Record<string, any> {
  const ld: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: o.name
  };
  if (o.url) ld.url = o.url;
  if (o.logo) ld.logo = o.logo;
  if (o.description) ld.description = o.description;
  return ld;
}

/** Breadcrumb navigation */
export function breadcrumbLd(
  items: { name: string; url: string }[]
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/** FAQ page */
export function faqLd(
  questions: { question: string; answer: string }[]
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };
}

/**
 * Generic entity → schema.org mapper.
 * Auto-maps common field names to schema.org properties.
 * Pass custom field mappings for domain-specific properties.
 */
export function entityLd(
  record: Record<string, any>,
  schemaType: string,
  customMappings?: Record<string, string>
): Record<string, any> {
  const fieldMap: Record<string, string> = {
    name: 'name',
    title: 'name',
    description: 'description',
    price: 'price',
    image: 'image',
    imageUrl: 'image',
    thumbnailUrl: 'image',
    createdAt: 'dateCreated',
    publishedAt: 'datePublished',
    updatedAt: 'dateModified',
    author: 'author',
    authorName: 'author',
    ...customMappings
  };

  const ld: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': schemaType
  };

  for (const [field, schemaProp] of Object.entries(fieldMap)) {
    if (record[field] !== undefined && record[field] !== null) {
      if (schemaProp === 'author') {
        ld[schemaProp] = { '@type': 'Person', name: record[field] };
      } else {
        ld[schemaProp] = record[field];
      }
    }
  }

  return ld;
}
