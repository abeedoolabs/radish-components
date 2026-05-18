<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  href = '',
  variant,
  hover = true,
  class: className = '',
  children,
  ...rest
}: {
  href?: string;
  variant?: ColorVariant;
  hover?: boolean;
  class?: string;
  children: Snippet;
  [key: string]: any;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'link-primary', secondary: 'link-secondary', accent: 'link-accent',
  info: 'link-info', success: 'link-success', warning: 'link-warning', error: 'link-error'
};
</script>

<a {href} class={cn('link', hover && 'link-hover', variant && variantMap[variant], className)} {...rest}>
  {@render children()}
</a>
