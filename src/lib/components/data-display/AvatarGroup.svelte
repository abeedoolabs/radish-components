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

<div class={cn('avatar-group -space-x-6 rtl:space-x-reverse', className)}>
  {@render children()}
</div>
