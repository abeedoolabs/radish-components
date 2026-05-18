<script lang="ts">
/**
 * Badge component - DaisyUI badge with variant presets for common statuses
 */
import { cn } from '../../utils.js';

let {
  text = '',
  variant = 'ghost',
  size = 'sm',
  outline = false,
  class: className = ''
}: {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost' | 'neutral' | 'auto' | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  outline?: boolean;
  class?: string;
} = $props();

const statusPresets: Record<string, string> = {
  active: 'success', inactive: 'ghost', enabled: 'success', disabled: 'ghost',
  pending: 'warning', approved: 'success', rejected: 'error',
  draft: 'ghost', published: 'success', archived: 'neutral',
  admin: 'primary', system: 'primary', custom: 'ghost',
  error: 'error', warning: 'warning', info: 'info',
};

const resolvedVariant = $derived(
  variant === 'auto' ? (statusPresets[text.toLowerCase()] || 'ghost') : variant
);

const variantClasses: Record<string, string> = {
  primary: 'badge-primary', secondary: 'badge-secondary', success: 'badge-success',
  warning: 'badge-warning', error: 'badge-error', info: 'badge-info',
  ghost: 'badge-ghost', neutral: 'badge-neutral'
};

const sizeClasses: Record<string, string> = {
  xs: 'badge-xs', sm: 'badge-sm', md: '', lg: 'badge-lg'
};
</script>

<span class={cn('badge', variantClasses[resolvedVariant] || 'badge-ghost', sizeClasses[size] || 'badge-sm', outline && 'badge-outline', className)}>
  {text}
</span>
