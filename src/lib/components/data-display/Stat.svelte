<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  title = '',
  value = '',
  description = '',
  class: className = '',
  figure
}: {
  title?: string;
  value?: string | number;
  description?: string;
  class?: string;
  figure?: Snippet;
} = $props();
</script>

<div class={cn('stat', className)}>
  {#if figure}
    <div class="stat-figure">
      {@render figure()}
    </div>
  {/if}
  {#if title}
    <div class="stat-title">{title}</div>
  {/if}
  <div class="stat-value">{value}</div>
  {#if description}
    <div class="stat-desc">{description}</div>
  {/if}
</div>
