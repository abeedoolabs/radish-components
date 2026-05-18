<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  value = $bindable(''),
  options = [] as { value: string; label: string; disabled?: boolean }[],
  placeholder = '',
  size,
  variant,
  bordered = true,
  disabled = false,
  required = false,
  name = '',
  class: className = '',
  ...rest
}: {
  value?: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  size?: Size;
  variant?: ColorVariant;
  bordered?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  class?: string;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'select-xs', sm: 'select-sm', md: '', lg: 'select-lg' };
const variantMap: Record<string, string> = {
  primary: 'select-primary', secondary: 'select-secondary', accent: 'select-accent',
  info: 'select-info', success: 'select-success', warning: 'select-warning', error: 'select-error'
};
</script>

<select
  {name}
  bind:value
  {disabled}
  {required}
  class={cn('select w-full', bordered && 'select-bordered', size && sizeMap[size], variant && variantMap[variant], className)}
  {...rest}
>
  {#if placeholder}
    <option value="" disabled>{placeholder}</option>
  {/if}
  {#each options as opt}
    <option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
  {/each}
</select>
