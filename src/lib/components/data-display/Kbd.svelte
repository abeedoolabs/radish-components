<script lang="ts">
import { cn } from '../../utils.js';
import type { Size } from '../../types.js';

let {
  key = '',
  size,
  class: className = ''
}: {
  key: string;
  size?: Size;
  class?: string;
} = $props();

const sizeMap: Record<string, string> = { xs: 'kbd-xs', sm: 'kbd-sm', md: 'kbd-md', lg: 'kbd-lg' };
</script>

<kbd class={cn('kbd', size && sizeMap[size], className)}>{key}</kbd>
