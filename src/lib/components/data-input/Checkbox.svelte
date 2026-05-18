<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  checked = $bindable(false),
  indeterminate = false,
  size,
  variant,
  disabled = false,
  name = '',
  label = '',
  class: className = '',
  ...rest
}: {
  checked?: boolean;
  indeterminate?: boolean;
  size?: Size;
  variant?: ColorVariant;
  disabled?: boolean;
  name?: string;
  label?: string;
  class?: string;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'checkbox-xs', sm: 'checkbox-sm', md: '', lg: 'checkbox-lg' };
const variantMap: Record<string, string> = {
  primary: 'checkbox-primary', secondary: 'checkbox-secondary', accent: 'checkbox-accent',
  info: 'checkbox-info', success: 'checkbox-success', warning: 'checkbox-warning', error: 'checkbox-error'
};
</script>

{#if label}
  <label class={cn('label cursor-pointer justify-start gap-3', className)}>
    <input type="checkbox" {name} bind:checked {disabled} {indeterminate}
      class={cn('checkbox', size && sizeMap[size], variant && variantMap[variant])} {...rest} />
    <span class="label-text">{label}</span>
  </label>
{:else}
  <input type="checkbox" {name} bind:checked {disabled} {indeterminate}
    class={cn('checkbox', size && sizeMap[size], variant && variantMap[variant], className)} {...rest} />
{/if}
