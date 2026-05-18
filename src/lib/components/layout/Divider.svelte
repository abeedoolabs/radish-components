<script lang="ts">
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  text = '',
  vertical = false,
  variant,
  class: className = ''
}: {
  text?: string;
  vertical?: boolean;
  variant?: ColorVariant;
  class?: string;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'divider-primary', secondary: 'divider-secondary', accent: 'divider-accent',
  info: 'divider-info', success: 'divider-success', warning: 'divider-warning', error: 'divider-error'
};
</script>

<div class={cn('divider', vertical && 'divider-horizontal', variant && variantMap[variant], className)}>
  {#if text}{text}{/if}
</div>
