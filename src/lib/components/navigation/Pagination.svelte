<script lang="ts">
import { cn } from '../../utils.js';
import type { Size } from '../../types.js';

let {
  page = $bindable(1),
  totalPages = 1,
  size,
  class: className = '',
  onChange
}: {
  page?: number;
  totalPages: number;
  size?: Size;
  class?: string;
  onChange?: (page: number) => void;
} = $props();

const sizeMap: Record<string, string> = { xs: 'btn-xs', sm: 'btn-sm', md: '', lg: 'btn-lg' };

function goTo(p: number) {
  if (p < 1 || p > totalPages) return;
  page = p;
  onChange?.(p);
}

let pages = $derived.by(() => {
  const result: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) result.push(i);
  } else {
    result.push(1);
    if (page > 3) result.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      result.push(i);
    }
    if (page < totalPages - 2) result.push('...');
    result.push(totalPages);
  }
  return result;
});
</script>

<div class={cn('join', className)}>
  <button class={cn('join-item btn', size && sizeMap[size])} disabled={page <= 1} onclick={() => goTo(page - 1)}>
    &laquo;
  </button>
  {#each pages as p}
    {#if p === '...'}
      <button class={cn('join-item btn btn-disabled', size && sizeMap[size])}>...</button>
    {:else}
      <button
        class={cn('join-item btn', size && sizeMap[size], page === p && 'btn-active')}
        onclick={() => goTo(p)}
      >
        {p}
      </button>
    {/if}
  {/each}
  <button class={cn('join-item btn', size && sizeMap[size])} disabled={page >= totalPages} onclick={() => goTo(page + 1)}>
    &raquo;
  </button>
</div>
