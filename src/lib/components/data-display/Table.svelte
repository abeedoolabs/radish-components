<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { Size } from '../../types.js';

let {
  zebra = false,
  pinRows = false,
  pinCols = false,
  size,
  class: className = '',
  children
}: {
  zebra?: boolean;
  pinRows?: boolean;
  pinCols?: boolean;
  size?: Size;
  class?: string;
  children: Snippet;
} = $props();

const sizeMap: Record<string, string> = { xs: 'table-xs', sm: 'table-sm', md: 'table-md', lg: 'table-lg' };
</script>

<div class="overflow-x-auto">
  <table class={cn('table', zebra && 'table-zebra', pinRows && 'table-pin-rows', pinCols && 'table-pin-cols', size && sizeMap[size], className)}>
    {@render children()}
  </table>
</div>
