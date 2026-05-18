<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  class: className = '',
  children
}: {
  class?: string;
  children: Snippet;
} = $props();
</script>

<li class={cn('list-row', className)}>
  {@render children()}
</li>
