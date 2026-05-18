<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  tip = '',
  position = 'top',
  variant,
  open = false,
  class: className = '',
  children
}: {
  tip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: ColorVariant;
  open?: boolean;
  class?: string;
  children: Snippet;
} = $props();

const posMap: Record<string, string> = {
  top: 'tooltip-top', bottom: 'tooltip-bottom', left: 'tooltip-left', right: 'tooltip-right'
};
const variantMap: Record<string, string> = {
  primary: 'tooltip-primary', secondary: 'tooltip-secondary', accent: 'tooltip-accent',
  info: 'tooltip-info', success: 'tooltip-success', warning: 'tooltip-warning', error: 'tooltip-error'
};
</script>

<div class={cn('tooltip', posMap[position], variant && variantMap[variant], open && 'tooltip-open', className)} data-tip={tip}>
  {@render children()}
</div>
