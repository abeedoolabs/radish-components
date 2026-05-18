<script lang="ts">
/**
 * Tabs component - DaisyUI tabbed content panels
 */
import type { Snippet } from 'svelte';

interface Tab {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  content?: Snippet;
}

let {
  tabs = [] as Tab[],
  activeTab = $bindable(''),
  variant = 'bordered',
  size = 'md',
  onChange
}: {
  tabs: Tab[];
  activeTab?: string;
  variant?: 'bordered' | 'lifted' | 'boxed';
  size?: 'sm' | 'md' | 'lg';
  onChange?: (key: string) => void;
} = $props();

$effect(() => {
  if (!activeTab && tabs.length > 0) {
    activeTab = tabs[0].key;
  }
});

function selectTab(key: string) {
  activeTab = key;
  onChange?.(key);
}

const tabsClass = $derived(
  `tabs tabs-${variant} ${size === 'lg' ? 'tabs-lg' : size === 'sm' ? 'tabs-sm' : ''}`
);

let activeContent = $derived(
  tabs.find(t => t.key === activeTab)?.content
);
</script>

<div>
  <div role="tablist" class={tabsClass}>
    {#each tabs as tab}
      <button
        role="tab"
        type="button"
        class="tab {activeTab === tab.key ? 'tab-active' : ''}"
        disabled={tab.disabled}
        onclick={() => selectTab(tab.key)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div class="pt-4">
    {#if activeContent}
      {@render activeContent()}
    {/if}
  </div>
</div>
