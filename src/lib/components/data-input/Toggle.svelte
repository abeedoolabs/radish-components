<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  checked = $bindable(false),
  size,
  variant,
  disabled = false,
  name = '',
  label = '',
  class: className = '',
  ...rest
}: {
  checked?: boolean;
  size?: Size;
  variant?: ColorVariant;
  disabled?: boolean;
  name?: string;
  label?: string;
  class?: string;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'toggle-xs', sm: 'toggle-sm', md: '', lg: 'toggle-lg' };
const variantMap: Record<string, string> = {
  primary: 'toggle-primary', secondary: 'toggle-secondary', accent: 'toggle-accent',
  info: 'toggle-info', success: 'toggle-success', warning: 'toggle-warning', error: 'toggle-error'
};
</script>

{#if label}
  <label class={cn('label cursor-pointer justify-start gap-3', className)}>
    <input type="checkbox" {name} bind:checked {disabled}
      class={cn('toggle', size && sizeMap[size], variant && variantMap[variant])} {...rest} />
    <span class="label-text">{label}</span>
  </label>
{:else}
  <input type="checkbox" {name} bind:checked {disabled}
    class={cn('toggle', size && sizeMap[size], variant && variantMap[variant], className)} {...rest} />
{/if}
