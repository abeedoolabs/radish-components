<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { Size } from '../../types.js';

let {
  size,
  class: className = '',
  children
}: {
  size?: Size;
  class?: string;
  children: Snippet;
} = $props();

const sizeMap: Record<string, string> = { xs: 'list-xs', sm: 'list-sm', md: 'list-md', lg: 'list-lg' };
</script>

<ul class={cn('list bg-base-100 rounded-box shadow-md', size && sizeMap[size], className)}>
  {@render children()}
</ul>
