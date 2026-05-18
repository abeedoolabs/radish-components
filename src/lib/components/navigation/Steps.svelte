<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  vertical = false,
  class: className = '',
  children
}: {
  vertical?: boolean;
  class?: string;
  children: Snippet;
} = $props();
</script>

<ul class={cn('steps', vertical && 'steps-vertical', className)}>
  {@render children()}
</ul>
