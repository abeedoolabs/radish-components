<script lang="ts">
import { cn } from '../../utils.js';
import type { Size } from '../../types.js';

let {
  value = $bindable(0),
  max = 5,
  half = false,
  size,
  disabled = false,
  name = `rating-${Math.random().toString(36).substring(2, 9)}`,
  class: className = ''
}: {
  value?: number;
  max?: number;
  half?: boolean;
  size?: Size;
  disabled?: boolean;
  name?: string;
  class?: string;
} = $props();

const sizeMap: Record<string, string> = { xs: 'rating-xs', sm: 'rating-sm', md: 'rating-md', lg: 'rating-lg' };
</script>

<div class={cn('rating', half && 'rating-half', size && sizeMap[size], className)}>
  {#each Array(max) as _, i}
    {#if half}
      <input type="radio" {name} class="mask mask-star-2 mask-half-1 bg-warning"
        checked={value === i + 0.5} {disabled}
        onchange={() => value = i + 0.5} />
      <input type="radio" {name} class="mask mask-star-2 mask-half-2 bg-warning"
        checked={value === i + 1} {disabled}
        onchange={() => value = i + 1} />
    {:else}
      <input type="radio" {name} class="mask mask-star-2 bg-warning"
        checked={value === i + 1} {disabled}
        onchange={() => value = i + 1} />
    {/if}
  {/each}
</div>
