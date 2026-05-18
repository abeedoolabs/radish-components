<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { Variant, Size } from '../../types.js';

let {
  id = '',
  label = 'Open',
  variant,
  size,
  mode = 'details' as 'details' | 'popover',
  position = 'bottom',
  align = 'start',
  hover = false,
  class: className = '',
  trigger,
  children
}: {
  id?: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  mode?: 'details' | 'popover';
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'end';
  hover?: boolean;
  class?: string;
  trigger?: Snippet;
  children: Snippet;
} = $props();

// Auto-generate unique id if not provided
const uid = id || `dropdown-${Math.random().toString(36).substring(2, 9)}`;
const anchorName = `--anchor-${uid}`;

const posMap: Record<string, string> = {
  top: 'dropdown-top', bottom: 'dropdown-bottom', left: 'dropdown-left', right: 'dropdown-right'
};
const alignMap: Record<string, string> = { start: '', end: 'dropdown-end' };

const variantMap: Record<string, string> = {
  primary: 'btn-primary', secondary: 'btn-secondary', accent: 'btn-accent',
  info: 'btn-info', success: 'btn-success', warning: 'btn-warning',
  error: 'btn-error', ghost: 'btn-ghost', neutral: 'btn-neutral'
};
const sizeMap: Record<string, string> = { xs: 'btn-xs', sm: 'btn-sm', md: '', lg: 'btn-lg' };

const btnClass = $derived(cn('btn', variant && variantMap[variant], size && sizeMap[size]));
</script>

{#if mode === 'popover'}
  <!-- Popover API approach (modern browsers) -->
  <button
    class={cn(btnClass, className)}
    popovertarget={uid}
    style="anchor-name:{anchorName}"
  >
    {#if trigger}{@render trigger()}{:else}{label}{/if}
  </button>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <ul
    class={cn('dropdown menu w-52 rounded-box bg-base-100 shadow-sm border border-base-300', posMap[position], alignMap[align])}
    popover
    id={uid}
    style="position-anchor:{anchorName}"
  >
    {@render children()}
  </ul>
{:else}
  <!-- Details approach (universal support) -->
  <details class={cn('dropdown', posMap[position], alignMap[align], hover && 'dropdown-hover', className)}>
    <summary class={cn(btnClass, 'm-1')}>
      {#if trigger}{@render trigger()}{:else}{label}{/if}
    </summary>
    <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border border-base-300">
      {@render children()}
    </ul>
  </details>
{/if}
