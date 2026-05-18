<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import Icon from '../composites/Icon.svelte';

let {
  items = [] as any[],
  snap = 'start',
  vertical = false,
  showControls = false,
  showIndicators = false,
  autoPlay = 0,
  class: className = '',
  children,
  renderItem
}: {
  items?: any[];
  snap?: 'start' | 'center' | 'end';
  vertical?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  autoPlay?: number;
  class?: string;
  children?: Snippet;
  renderItem?: Snippet<[any, number]>;
} = $props();

const snapMap: Record<string, string> = {
  start: 'carousel-start', center: 'carousel-center', end: 'carousel-end'
};

let carouselEl: HTMLDivElement;
let currentIndex = $state(0);

function scrollTo(index: number) {
  if (!carouselEl) return;
  const slides = carouselEl.querySelectorAll(':scope > .carousel-item');
  if (slides[index]) {
    slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    currentIndex = index;
  }
}

function prev() {
  const total = items.length || carouselEl?.querySelectorAll(':scope > .carousel-item').length || 0;
  scrollTo(currentIndex > 0 ? currentIndex - 1 : total - 1);
}

function next() {
  const total = items.length || carouselEl?.querySelectorAll(':scope > .carousel-item').length || 0;
  scrollTo(currentIndex < total - 1 ? currentIndex + 1 : 0);
}

// Auto-play
$effect(() => {
  if (autoPlay <= 0) return;
  const interval = setInterval(next, autoPlay);
  return () => clearInterval(interval);
});
</script>

<div class="relative">
  <div
    bind:this={carouselEl}
    class={cn('carousel w-full', snapMap[snap], vertical && 'carousel-vertical', className)}
  >
    {#if renderItem && items.length > 0}
      {#each items as item, i}
        <div class="carousel-item" id={`slide-${i}`}>
          {@render renderItem(item, i)}
        </div>
      {/each}
    {:else if children}
      {@render children()}
    {/if}
  </div>

  {#if showControls}
    <div class="absolute inset-y-0 left-0 flex items-center">
      <button type="button" class="btn btn-circle btn-sm ml-2 opacity-70 hover:opacity-100" onclick={prev}>
        <Icon name="chevron-left" size={16} />
      </button>
    </div>
    <div class="absolute inset-y-0 right-0 flex items-center">
      <button type="button" class="btn btn-circle btn-sm mr-2 opacity-70 hover:opacity-100" onclick={next}>
        <Icon name="chevron-right" size={16} />
      </button>
    </div>
  {/if}

  {#if showIndicators}
    {@const total = items.length || 0}
    {#if total > 0}
      <div class="flex justify-center gap-2 py-2">
        {#each Array(total) as _, i}
          <button
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            class={cn('w-2 h-2 rounded-full transition-colors', currentIndex === i ? 'bg-primary' : 'bg-base-content/20')}
            onclick={() => scrollTo(i)}
          ></button>
        {/each}
      </div>
    {/if}
  {/if}
</div>
