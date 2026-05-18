<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  variant,
  class: className = '',
  start,
  middle,
  end
}: {
  variant?: ColorVariant;
  class?: string;
  start?: Snippet;
  middle?: Snippet;
  end?: Snippet;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'bg-primary', secondary: 'bg-secondary', accent: 'bg-accent',
  info: 'bg-info', success: 'bg-success', warning: 'bg-warning', error: 'bg-error'
};
</script>

<li class={className}>
  {#if start}
    <div class="timeline-start">
      {@render start()}
    </div>
  {/if}
  <div class={cn('timeline-middle', variant && variantMap[variant])}></div>
  {#if end}
    <div class="timeline-end">
      {@render end()}
    </div>
  {/if}
  <hr />
</li>
