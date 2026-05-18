<script lang="ts">
import { cn } from '../../utils.js';
import type { Size, ColorVariant } from '../../types.js';

let {
  size,
  variant,
  bordered = true,
  ghost = false,
  disabled = false,
  required = false,
  accept = '',
  multiple = false,
  name = '',
  class: className = '',
  ...rest
}: {
  size?: Size;
  variant?: ColorVariant;
  bordered?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  name?: string;
  class?: string;
  [key: string]: any;
} = $props();

const sizeMap: Record<string, string> = { xs: 'file-input-xs', sm: 'file-input-sm', md: '', lg: 'file-input-lg' };
const variantMap: Record<string, string> = {
  primary: 'file-input-primary', secondary: 'file-input-secondary', accent: 'file-input-accent',
  info: 'file-input-info', success: 'file-input-success', warning: 'file-input-warning', error: 'file-input-error'
};
</script>

<input type="file" {name} {accept} {multiple} {disabled} {required}
  class={cn('file-input w-full', bordered && 'file-input-bordered', ghost && 'file-input-ghost', size && sizeMap[size], variant && variantMap[variant], className)}
  {...rest} />
