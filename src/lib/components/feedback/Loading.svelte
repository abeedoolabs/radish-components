<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  type = 'spinner',
  size = 'md',
  variant,
  class: className = ''
}: {
  type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
  size?: Size;
  variant?: ColorVariant;
  class?: string;
} = $props();

const sizeMap: Record<string, string> = { xs: 'loading-xs', sm: 'loading-sm', md: 'loading-md', lg: 'loading-lg' };
const typeMap: Record<string, string> = {
  spinner: 'loading-spinner', dots: 'loading-dots', ring: 'loading-ring',
  ball: 'loading-ball', bars: 'loading-bars', infinity: 'loading-infinity'
};
const variantMap: Record<string, string> = {
  primary: 'text-primary', secondary: 'text-secondary', accent: 'text-accent',
  info: 'text-info', success: 'text-success', warning: 'text-warning', error: 'text-error'
};
</script>

<span class={cn('loading', typeMap[type], sizeMap[size], variant && variantMap[variant], className)}></span>
