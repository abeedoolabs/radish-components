<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  center = false,
  class: className = '',
  children
}: {
  center?: boolean;
  class?: string;
  children: Snippet;
} = $props();
</script>

<footer class={cn('footer p-10 bg-base-200 text-base-content', center && 'footer-center', className)}>
  {@render children()}
</footer>
