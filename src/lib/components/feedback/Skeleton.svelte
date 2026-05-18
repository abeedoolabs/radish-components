<script lang="ts">
import { cn } from '../../utils.js';

let {
  width = '',
  height = '',
  circle = false,
  class: className = ''
}: {
  width?: string;
  height?: string;
  circle?: boolean;
  class?: string;
} = $props();

const style = $derived([width && `width:${width}`, height && `height:${height}`].filter(Boolean).join(';'));
</script>

<div class={cn('skeleton', circle && 'rounded-full', className)} style={style || undefined}></div>
