<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  horizontal = true,
  class: className = '',
  children
}: {
  horizontal?: boolean;
  class?: string;
  children: Snippet;
} = $props();
</script>

<div class={cn('stats shadow', !horizontal && 'stats-vertical', className)}>
  {@render children()}
</div>
