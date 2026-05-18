<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  vertical = true,
  compact = false,
  class: className = '',
  children
}: {
  vertical?: boolean;
  compact?: boolean;
  class?: string;
  children: Snippet;
} = $props();
</script>

<ul class={cn('timeline', !vertical && 'timeline-horizontal', compact && 'timeline-compact', className)}>
  {@render children()}
</ul>
