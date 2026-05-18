<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  class: className = '',
  start,
  center,
  end
}: {
  class?: string;
  start?: Snippet;
  center?: Snippet;
  end?: Snippet;
} = $props();
</script>

<div class={cn('navbar bg-base-100', className)}>
  {#if start}
    <div class="navbar-start">
      {@render start()}
    </div>
  {/if}
  {#if center}
    <div class="navbar-center">
      {@render center()}
    </div>
  {/if}
  {#if end}
    <div class="navbar-end">
      {@render end()}
    </div>
  {/if}
</div>
