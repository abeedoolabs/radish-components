<script lang="ts">
/**
 * PageHeader component - Title, subtitle, breadcrumbs, action buttons
 */
import type { Snippet } from 'svelte';

interface Breadcrumb {
  label: string;
  href?: string;
}

let {
  title = '',
  subtitle = '',
  breadcrumbs = [] as Breadcrumb[],
  actions
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: Snippet;
} = $props();
</script>

<div class="space-y-1 mb-6">
  {#if breadcrumbs.length > 0}
    <div class="text-sm breadcrumbs py-0">
      <ul>
        {#each breadcrumbs as crumb}
          <li>
            {#if crumb.href}
              <a href={crumb.href} class="text-base-content/50 hover:text-base-content">{crumb.label}</a>
            {:else}
              <span class="text-base-content/50">{crumb.label}</span>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="flex items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold">{title}</h1>
      {#if subtitle}
        <p class="text-base-content/60 mt-1">{subtitle}</p>
      {/if}
    </div>
    {#if actions}
      <div class="flex items-center gap-2">
        {@render actions()}
      </div>
    {/if}
  </div>
</div>
