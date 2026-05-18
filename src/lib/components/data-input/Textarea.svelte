<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  value = $bindable(''),
  placeholder = '',
  rows = 3,
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
  placeholder?: string;
  rows?: number;
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

const sizeMap: Record<string, string> = { xs: 'textarea-xs', sm: 'textarea-sm', md: '', lg: 'textarea-lg' };
const variantMap: Record<string, string> = {
  primary: 'textarea-primary', secondary: 'textarea-secondary', accent: 'textarea-accent',
  info: 'textarea-info', success: 'textarea-success', warning: 'textarea-warning', error: 'textarea-error'
};
</script>

<textarea
  {name}
  bind:value
  {placeholder}
  {rows}
  {disabled}
  {readonly}
  {required}
  class={cn('textarea w-full', bordered && 'textarea-bordered', ghost && 'textarea-ghost', size && sizeMap[size], variant && variantMap[variant], className)}
  {...rest}
></textarea>
