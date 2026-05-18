<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  variant,
  content = '',
  class: className = '',
  children
}: {
  variant?: ColorVariant;
  content?: string;
  class?: string;
  children: Snippet;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'step-primary', secondary: 'step-secondary', accent: 'step-accent',
  info: 'step-info', success: 'step-success', warning: 'step-warning', error: 'step-error'
};
</script>

<li class={cn('step', variant && variantMap[variant], className)} data-content={content || undefined}>
  {@render children()}
</li>
