<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  open = $bindable(false),
  id = 'app-drawer',
  side = 'left',
  class: className = '',
  children,
  sidebar
}: {
  open?: boolean;
  id?: string;
  side?: 'left' | 'right';
  class?: string;
  children: Snippet;
  sidebar: Snippet;
} = $props();
</script>

<div class={cn('drawer', side === 'right' && 'drawer-end', className)}>
  <input {id} type="checkbox" class="drawer-toggle" bind:checked={open} />
  <div class="drawer-content">
    {@render children()}
  </div>
  <div class="drawer-side">
    <label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
    {@render sidebar()}
  </div>
</div>
