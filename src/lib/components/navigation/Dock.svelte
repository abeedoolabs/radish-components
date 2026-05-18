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

const sizeMap: Record<string, string> = { xs: 'dock-xs', sm: 'dock-sm', md: 'dock-md', lg: 'dock-lg' };
</script>

<div class={cn('dock', size && sizeMap[size], className)}>
  {@render children()}
</div>
