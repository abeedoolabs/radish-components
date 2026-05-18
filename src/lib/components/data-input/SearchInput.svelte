<script lang="ts">
import { cn } from '../../utils.js';
import type { Size } from '../../types.js';
import Icon from '../composites/Icon.svelte';

let {
  value = $bindable(''),
  placeholder = 'Search...',
  size,
  debounce = 300,
  loading = false,
  class: className = '',
  onSearch,
  ...rest
}: {
  value?: string;
  placeholder?: string;
  size?: Size;
  debounce?: number;
  loading?: boolean;
  class?: string;
  onSearch?: (term: string) => void;
  [key: string]: any;
} = $props();

let timer: ReturnType<typeof setTimeout>;

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  value = val;
  clearTimeout(timer);
  timer = setTimeout(() => {
    onSearch?.(val.trim());
  }, debounce);
}

function clear() {
  value = '';
  onSearch?.('');
}
</script>

<div class={cn('relative', className)}>
  <input
    type="text"
    {placeholder}
    class={cn('input input-bordered w-full pl-9', size === 'xs' && 'input-xs', size === 'sm' && 'input-sm', size === 'lg' && 'input-lg')}
    value={value}
    oninput={handleInput}
    {...rest}
  />
  <span class="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">
    {#if loading}
      <span class="loading loading-spinner loading-xs"></span>
    {:else}
      <Icon name="search" size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />
    {/if}
  </span>
  {#if value}
    <button
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
      onclick={clear}
    >
      <Icon name="x" size={12} />
    </button>
  {/if}
</div>
