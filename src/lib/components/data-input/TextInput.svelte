<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  value = $bindable(''),
  type = 'text',
  placeholder = '',
  size,
  variant,
  bordered = true,
  ghost = false,
  disabled = false,
  readonly = false,
  required = false,
  name = '',
  class: className = '',
  ...rest
}: {
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'date' | 'datetime-local' | 'search';
  placeholder?: string;
  size?: Size;
  variant?: ColorVariant;
  bordered?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  class?: string;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'input-xs', sm: 'input-sm', md: '', lg: 'input-lg' };
const variantMap: Record<string, string> = {
  primary: 'input-primary', secondary: 'input-secondary', accent: 'input-accent',
  info: 'input-info', success: 'input-success', warning: 'input-warning', error: 'input-error'
};
</script>

<input
  {type}
  {name}
  bind:value
  {placeholder}
  {disabled}
  {readonly}
  {required}
  class={cn('input w-full', bordered && 'input-bordered', ghost && 'input-ghost', size && sizeMap[size], variant && variantMap[variant], className)}
  {...rest}
/>
