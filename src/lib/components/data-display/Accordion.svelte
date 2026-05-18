<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  exclusive = false,
  class: className = '',
  children
}: {
  exclusive?: boolean;
  class?: string;
  children: Snippet;
} = $props();
</script>

<div class={cn('space-y-1', className)} data-exclusive={exclusive || undefined}>
  {@render children()}
</div>
