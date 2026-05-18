<script lang="ts">
import { cn } from '../../utils.js';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

let {
  items = [] as BreadcrumbItem[],
  size,
  class: className = ''
}: {
  items: BreadcrumbItem[];
  size?: 'sm' | 'md' | 'lg';
  class?: string;
} = $props();

const sizeMap: Record<string, string> = { sm: 'text-sm', md: '', lg: 'text-lg' };
</script>

<div class={cn('breadcrumbs', size && sizeMap[size], className)}>
  <ul>
    {#each items as item}
      <li>
        {#if item.href}
          <a href={item.href}>{item.label}</a>
        {:else}
          <span>{item.label}</span>
        {/if}
      </li>
    {/each}
  </ul>
</div>
