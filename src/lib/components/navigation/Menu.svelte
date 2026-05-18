<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { Size } from '../../types.js';

let {
  horizontal = false,
  size,
  rounded = true,
  class: className = '',
  children
}: {
  horizontal?: boolean;
  size?: Size;
  rounded?: boolean;
  class?: string;
  children: Snippet;
} = $props();

const sizeMap: Record<string, string> = { xs: 'menu-xs', sm: 'menu-sm', md: 'menu-md', lg: 'menu-lg' };
</script>

<ul class={cn('menu', horizontal && 'menu-horizontal', size && sizeMap[size], rounded && 'rounded-box', className)}>
  {@render children()}
</ul>
