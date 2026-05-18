<script lang="ts">
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  variant = 'success' as ColorVariant,
  class: className = ''
}: {
  variant?: ColorVariant;
  class?: string;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'status-primary', secondary: 'status-secondary', accent: 'status-accent',
  info: 'status-info', success: 'status-success', warning: 'status-warning', error: 'status-error'
};
</script>

<div class={cn('status', variantMap[variant], className)}></div>
