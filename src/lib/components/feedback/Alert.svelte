<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';
import Icon from '../composites/Icon.svelte';

let {
  variant = 'info' as ColorVariant,
  icon,
  class: className = '',
  children,
  ...rest
}: {
  variant?: ColorVariant;
  icon?: string;
  class?: string;
  children: Snippet;
  [key: string]: any;
} = $props();

const variantMap: Record<string, string> = {
  info: 'alert-info', success: 'alert-success', warning: 'alert-warning',
  error: 'alert-error', primary: 'alert-primary', secondary: 'alert-secondary', accent: 'alert-accent'
};

const defaultIcons: Record<string, string> = {
  info: 'info', success: 'check-circle', warning: 'alert-triangle', error: 'alert-circle'
};

const resolvedIcon = $derived(icon || defaultIcons[variant] || 'info');
</script>

<div role="alert" class={cn('alert', variantMap[variant], className)} {...rest}>
  <Icon name={resolvedIcon} size={20} />
  <div>
    {@render children()}
  </div>
</div>
