<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  class: className = '',
  overlay,
  children
}: {
  class?: string;
  overlay?: Snippet;
  children: Snippet;
} = $props();
</script>

<div class={cn('hero min-h-[50vh]', className)}>
  {#if overlay}
    <div class="hero-overlay">
      {@render overlay()}
    </div>
  {/if}
  <div class="hero-content text-center">
    {@render children()}
  </div>
</div>
