<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  href = '',
  active = false,
  label = '',
  class: className = '',
  onclick,
  children
}: {
  href?: string;
  active?: boolean;
  label?: string;
  class?: string;
  onclick?: (e: MouseEvent) => void;
  children?: Snippet;
} = $props();
</script>

{#if href}
  <a {href} class={cn(active && 'dock-active', className)}>
    {#if children}{@render children()}{/if}
    {#if label}<span class="dock-label">{label}</span>{/if}
  </a>
{:else}
  <button type="button" class={cn(active && 'dock-active', className)} {onclick}>
    {#if children}{@render children()}{/if}
    {#if label}<span class="dock-label">{label}</span>{/if}
  </button>
{/if}
