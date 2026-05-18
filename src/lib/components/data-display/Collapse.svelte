<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  title = '',
  open = false,
  icon = 'arrow' as 'arrow' | 'plus',
  class: className = '',
  children
}: {
  title: string;
  open?: boolean;
  icon?: 'arrow' | 'plus';
  class?: string;
  children: Snippet;
} = $props();

const iconClass = icon === 'plus' ? 'collapse-plus' : 'collapse-arrow';
</script>

<div class={cn('collapse bg-base-100 border border-base-300', iconClass, className)}>
  <input type="checkbox" checked={open} />
  <div class="collapse-title font-semibold">{title}</div>
  <div class="collapse-content">
    {@render children()}
  </div>
</div>
