<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  value = '',
  group = $bindable(''),
  size,
  variant,
  disabled = false,
  name = '',
  label = '',
  class: className = '',
  ...rest
}: {
  value: string;
  group?: string;
  size?: Size;
  variant?: ColorVariant;
  disabled?: boolean;
  name?: string;
  label?: string;
  class?: string;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'radio-xs', sm: 'radio-sm', md: '', lg: 'radio-lg' };
const variantMap: Record<string, string> = {
  primary: 'radio-primary', secondary: 'radio-secondary', accent: 'radio-accent',
  info: 'radio-info', success: 'radio-success', warning: 'radio-warning', error: 'radio-error'
};
</script>

{#if label}
  <label class={cn('label cursor-pointer justify-start gap-3', className)}>
    <input type="radio" {name} {value} bind:group {disabled}
      class={cn('radio', size && sizeMap[size], variant && variantMap[variant])} {...rest} />
    <span class="label-text">{label}</span>
  </label>
{:else}
  <input type="radio" {name} {value} bind:group {disabled}
    class={cn('radio', size && sizeMap[size], variant && variantMap[variant], className)} {...rest} />
{/if}
