<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  title = '',
  name = '',
  checked = false,
  class: className = '',
  children
}: {
  title: string;
  name?: string;
  checked?: boolean;
  class?: string;
  children: Snippet;
} = $props();
</script>

<div class={cn('collapse collapse-arrow bg-base-100 border border-base-300', className)}>
  <input type={name ? 'radio' : 'checkbox'} name={name || undefined} {checked} />
  <div class="collapse-title font-semibold">{title}</div>
  <div class="collapse-content">
    {@render children()}
  </div>
</div>
