<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { Size, Variant } from '../../types.js';

let {
  variant,
  size,
  outline = false,
  loading = false,
  disabled = false,
  wide = false,
  block = false,
  type = 'button' as 'button' | 'submit' | 'reset',
  href,
  class: className = '',
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  outline?: boolean;
  loading?: boolean;
  disabled?: boolean;
  wide?: boolean;
  block?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  class?: string;
  children?: Snippet;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'btn-xs', sm: 'btn-sm', md: '', lg: 'btn-lg' };
const variantMap: Record<string, string> = {
  primary: 'btn-primary', secondary: 'btn-secondary', accent: 'btn-accent',
  info: 'btn-info', success: 'btn-success', warning: 'btn-warning',
  error: 'btn-error', ghost: 'btn-ghost', neutral: 'btn-neutral'
};

const classes = $derived(cn(
  'btn',
  variant && variantMap[variant],
  size && sizeMap[size],
  outline && 'btn-outline',
  wide && 'btn-wide',
  block && 'btn-block',
  className
));
</script>

{#if href}
  <a {href} class={classes} {...rest}>
    {#if loading}<span class="loading loading-spinner"></span>{/if}
    {#if children}{@render children()}{/if}
  </a>
{:else}
  <button {type} class={classes} disabled={disabled || loading} {...rest}>
    {#if loading}<span class="loading loading-spinner"></span>{/if}
    {#if children}{@render children()}{/if}
  </button>
{/if}
