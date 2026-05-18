<script lang="ts">
import { cn } from '../../utils.js';

let {
  value = 0,
  class: className = ''
}: {
  value: number;
  class?: string;
} = $props();
</script>

<span class={cn('countdown', className)}>
  <span style="--value:{Math.min(99, Math.max(0, Math.floor(value)))};"></span>
</span>
