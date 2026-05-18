<script lang="ts">
  import type { Snippet } from 'svelte';
  import CodeSample from './CodeSample.svelte';
  import PropTable, { type PropDef } from './PropTable.svelte';

  let {
    title = '',
    description = '',
    code = '',
    props = [] as PropDef[],
    children
  }: {
    title: string;
    description?: string;
    code?: string;
    props?: PropDef[];
    children: Snippet;
  } = $props();

  let showUsage = $state(false);
  let activeTab = $state('code' as 'code' | 'props');

  const hasUsage = $derived(!!code || props.length > 0);
</script>

<div class="mb-8" id={title.toLowerCase().replace(/\s+/g, '-')}>
  <h3 class="text-lg font-semibold mb-1">{title}</h3>
  {#if description}
    <p class="text-sm text-base-content/60 mb-3">{description}</p>
  {/if}
  <div class="border border-base-300 rounded-lg bg-base-100">
    <div class="p-6">
      {@render children()}
    </div>
    {#if hasUsage}
      <div class="border-t border-base-300">
        <button
          type="button"
          class="btn btn-ghost btn-sm w-full rounded-none gap-1 text-base-content/60"
          onclick={() => showUsage = !showUsage}
        >
          {showUsage ? 'Hide' : 'Show'} Usage
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform {showUsage ? 'rotate-180' : ''}">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {#if showUsage}
          <div>
            {#if code && props.length > 0}
              <div class="flex border-b border-base-300 bg-base-200/50">
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'code' ? 'border-b-2 border-primary text-primary' : 'text-base-content/50 hover:text-base-content'}"
                  onclick={() => activeTab = 'code'}
                >
                  Code
                </button>
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'props' ? 'border-b-2 border-primary text-primary' : 'text-base-content/50 hover:text-base-content'}"
                  onclick={() => activeTab = 'props'}
                >
                  Props
                </button>
              </div>
            {/if}

            {#if (!props.length || activeTab === 'code') && code}
              <div class="p-3">
                <CodeSample {code} />
              </div>
            {:else if props.length > 0}
              <div class="px-2 py-3">
                <PropTable {props} />
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
