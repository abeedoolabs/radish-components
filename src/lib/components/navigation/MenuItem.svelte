<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  href = '',
  active = false,
  disabled = false,
  class: className = '',
  children,
  ...rest
}: {
  href?: string;
  active?: boolean;
  disabled?: boolean;
  class?: string;
  children: Snippet;
  [key: string]: any;
} = $props();
</script>

<li class={cn(disabled && 'disabled', className)}>
  {#if href}
    <a {href} class={cn(active && 'active')} {...rest}>
      {@render children()}
    </a>
  {:else}
    <button type="button" class={cn(active && 'active')} {disabled} {...rest}>
      {@render children()}
    </button>
  {/if}
</li>
