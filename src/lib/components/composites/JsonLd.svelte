<script lang="ts">
  /**
   * JsonLd — Renders schema.org structured data in <svelte:head>
   *
   * Usage:
   *   import { JsonLd, productLd } from '@abeedoo/radish-components';
   *   <JsonLd data={productLd({ name: 'Coffee', price: 24.99 })} />
   */
  let { data }: { data: Record<string, any> } = $props();
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(data)}</script>`}
</svelte:head>
