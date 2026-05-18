<script lang="ts">
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  value,
  max = 100,
  variant,
  class: className = ''
}: {
  value?: number;
  max?: number;
  variant?: ColorVariant;
  class?: string;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'progress-primary', secondary: 'progress-secondary', accent: 'progress-accent',
  info: 'progress-info', success: 'progress-success', warning: 'progress-warning', error: 'progress-error'
};
</script>

<progress class={cn('progress', variant && variantMap[variant], className)} {value} {max}></progress>
