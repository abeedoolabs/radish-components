<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  value = $bindable(50),
  min = 0,
  max = 100,
  step = 1,
  size,
  variant,
  disabled = false,
  name = '',
  class: className = '',
  ...rest
}: {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: Size;
  variant?: ColorVariant;
  disabled?: boolean;
  name?: string;
  class?: string;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'range-xs', sm: 'range-sm', md: '', lg: 'range-lg' };
const variantMap: Record<string, string> = {
  primary: 'range-primary', secondary: 'range-secondary', accent: 'range-accent',
  info: 'range-info', success: 'range-success', warning: 'range-warning', error: 'range-error'
};
</script>

<input type="range" {name} bind:value {min} {max} {step} {disabled}
  class={cn('range', size && sizeMap[size], variant && variantMap[variant], className)} {...rest} />
