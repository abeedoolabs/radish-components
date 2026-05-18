<script lang="ts">
import { cn } from '../../utils.js';

let {
  title = '',
  class: className = ''
}: {
  title: string;
  class?: string;
} = $props();
</script>

<li class={cn('menu-title', className)}>{title}</li>
