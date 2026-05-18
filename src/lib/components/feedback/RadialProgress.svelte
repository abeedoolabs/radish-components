<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  value = 0,
  size = '4rem',
  thickness = '4px',
  variant,
  class: className = '',
  children
}: {
  value: number;
  size?: string;
  thickness?: string;
  variant?: ColorVariant;
  class?: string;
  children?: Snippet;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'text-primary', secondary: 'text-secondary', accent: 'text-accent',
  info: 'text-info', success: 'text-success', warning: 'text-warning', error: 'text-error'
};
</script>

<div
  class={cn('radial-progress', variant && variantMap[variant], className)}
  style="--value:{value}; --size:{size}; --thickness:{thickness};"
  role="progressbar"
  aria-valuenow={value}
>
  {#if children}
    {@render children()}
  {:else}
    {value}%
  {/if}
</div>
