<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';

  let { children } = $props();

  let drawerOpen = $state(false);

  onMount(() => {
    themeChange(false);
  });

  const nav = [
    { label: 'Overview', href: '/' },
    { label: 'Getting Started', href: '/getting-started' },
    {
      label: 'Actions', href: '/actions',
      items: ['Button', 'Dropdown', 'Swap', 'ThemeController']
    },
    {
      label: 'Data Display', href: '/data-display',
      items: ['Accordion', 'Avatar', 'Badge', 'Carousel', 'ChatBubble', 'CodeBlock', 'Collapse', 'Countdown', 'Kbd', 'List', 'Stat', 'Status', 'Table', 'Timeline']
    },
    {
      label: 'Data Input', href: '/data-input',
      items: ['Calendar', 'Checkbox', 'DateRangeInput', 'DropZone', 'FileInput', 'FormField', 'Radio', 'Range', 'Rating', 'SearchInput', 'Select', 'TextInput', 'Textarea', 'Toggle']
    },
    {
      label: 'Feedback', href: '/feedback',
      items: ['Alert', 'Loading', 'Progress', 'RadialProgress', 'Skeleton', 'Toast', 'Tooltip']
    },
    {
      label: 'Layout', href: '/layout',
      items: ['Card', 'Divider', 'Drawer', 'Footer', 'Hero', 'Stack']
    },
    {
      label: 'Navigation', href: '/navigation',
      items: ['Breadcrumbs', 'Dock', 'Link', 'Menu', 'Navbar', 'Pagination', 'Steps']
    },
    {
      label: 'Composites', href: '/composites',
      items: ['AutoForm', 'ChatPanel', 'ConfirmDialog', 'DataGrid', 'DataTable', 'EmptyState', 'Icon', 'Modal', 'PageHeader', 'Tabs']
    }
  ];

  // Track which sections are expanded
  let expanded = $state<Record<string, boolean>>({});

  // Auto-expand the section matching current path
  $effect(() => {
    for (const section of nav) {
      if (section.href && $page.url.pathname.startsWith(section.href) && section.href !== '/') {
        expanded[section.label] = true;
      }
    }
  });

  // Close drawer on navigation (mobile)
  $effect(() => {
    if ($page.url.pathname) {
      drawerOpen = false;
    }
  });

  let search = $state('');

  // Filter nav by search term
  let filteredNav = $derived.by(() => {
    if (!search.trim()) return nav;
    const q = search.toLowerCase();
    return nav
      .map(section => {
        if (!section.items) {
          return section.label.toLowerCase().includes(q) ? section : null;
        }
        const matchedItems = section.items.filter(item => item.toLowerCase().includes(q));
        if (matchedItems.length > 0) return { ...section, items: matchedItems };
        if (section.label.toLowerCase().includes(q)) return section;
        return null;
      })
      .filter(Boolean) as typeof nav;
  });

  // Auto-expand all sections when searching
  $effect(() => {
    if (search.trim()) {
      for (const section of filteredNav) {
        if (section.items) expanded[section.label] = true;
      }
    }
  });

  function toggleSection(label: string) {
    expanded[label] = !expanded[label];
  }

  let activeHash = $state('');

  onMount(() => {
    // Track hash changes
    const updateHash = () => { activeHash = window.location.hash; };
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  });

  // Also update on navigation and scroll content pane
  let mainEl: HTMLElement | undefined = $state();

  $effect(() => {
    // Re-read hash when page changes
    if ($page.url.pathname) {
      activeHash = typeof window !== 'undefined' ? window.location.hash : '';
    }

    // Scroll main content: to anchor if hash, to top if section change
    if (typeof window !== 'undefined' && mainEl) {
      const hash = window.location.hash;
      if (hash) {
        // Scroll to anchor element
        requestAnimationFrame(() => {
          const target = document.querySelector(hash);
          if (target && mainEl) {
            const mainRect = mainEl.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            mainEl.scrollTop += targetRect.top - mainRect.top - 16;
          }
        });
      } else {
        // No hash — scroll to top
        mainEl.scrollTop = 0;
      }
    }
  });

  function isActive(href: string): boolean {
    return $page.url.pathname === href;
  }

  function isSubItemActive(sectionHref: string, item: string): boolean {
    const hash = `#${item.toLowerCase()}`;
    return $page.url.pathname === sectionHref && activeHash === hash;
  }

  const themes = [
    'radish-cli', 'radish-cli-dark', 'radish-brand', 'radish-wizard',
    'radish-hub', 'radish-lib', 'radish-schemas', 'radish-docs', 'radish-cloud',
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
    'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween',
    'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy',
    'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn',
    'business', 'acid', 'lemonade', 'night', 'coffee', 'winter',
    'dim', 'nord', 'sunset', 'caramellatte', 'abyss', 'silk'
  ];
</script>

{#snippet sidebarContent()}
  <a href="/" class="flex items-center gap-3 mb-6">
    <img src="/logo.svg" alt="Radish" class="w-10 h-10" />
    <div>
      <div class="text-lg font-bold text-primary leading-tight">Radish</div>
      <div class="text-xs text-base-content/50">Components</div>
    </div>
  </a>

  <!-- Search -->
  <div class="relative mb-3">
    <input
      type="text"
      placeholder="Search components..."
      class="input input-bordered input-sm w-full pl-8"
      bind:value={search}
    />
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    {#if search}
      <button type="button" aria-label="Clear search" class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle" onclick={() => search = ''}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    {/if}
  </div>

  <nav class="flex-1 space-y-0.5 overflow-y-auto">
    {#each filteredNav as section}
      {#if !section.items}
        <a
          href={section.href}
          class="block px-3 py-2 rounded-lg text-sm transition-colors {isActive(section.href) ? 'bg-primary text-primary-content font-semibold' : 'hover:bg-base-300'}"
        >
          {section.label}
        </a>
      {:else}
        <div>
          <button
            type="button"
            class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors {isActive(section.href) ? 'bg-primary text-primary-content font-semibold' : 'hover:bg-base-300'}"
            onclick={() => toggleSection(section.label)}
          >
            <a
              href={section.href}
              class="flex-1 text-left"
              onclick={(e) => e.stopPropagation()}
            >
              {section.label}
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="transition-transform opacity-40 {expanded[section.label] ? 'rotate-180' : ''}"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {#if expanded[section.label]}
            <div class="ml-3 pl-3 border-l border-base-300 mt-0.5 space-y-0.5">
              {#each section.items as item}
                <a
                  href="{section.href}#{item.toLowerCase()}"
                  class="block px-2 py-1 rounded text-xs transition-colors {isSubItemActive(section.href, item) ? 'text-primary font-semibold bg-primary/10' : 'text-base-content/60 hover:text-base-content hover:bg-base-300'}"
                >
                  {item}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/each}
  </nav>

  <div class="text-xs text-base-content/40 mt-4">
    Svelte 5 + DaisyUI v5
  </div>
{/snippet}

<div class="flex h-screen overflow-hidden">
  <!-- Desktop sidebar -->
  <aside class="hidden lg:flex w-64 bg-base-200 p-4 border-r border-base-300 flex-shrink-0 flex-col h-full overflow-y-auto">
    {@render sidebarContent()}
  </aside>

  <!-- Mobile drawer overlay -->
  {#if drawerOpen}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      onclick={() => drawerOpen = false}
      onkeydown={(e) => { if (e.key === 'Escape') drawerOpen = false; }}
    ></div>
    <aside class="fixed inset-y-0 left-0 z-50 w-72 bg-base-200 p-4 flex flex-col h-full overflow-y-auto shadow-xl lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        class="btn btn-ghost btn-sm btn-circle absolute top-3 right-3"
        onclick={() => drawerOpen = false}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      {@render sidebarContent()}
    </aside>
  {/if}

  <div class="flex-1 flex flex-col h-full overflow-hidden">
    <!-- Top bar -->
    <div class="shrink-0 flex items-center px-4 lg:px-6 py-2 border-b border-base-300 bg-base-100 gap-3">
      <!-- Mobile hamburger -->
      <button
        type="button"
        aria-label="Open menu"
        class="btn btn-ghost btn-sm btn-square lg:hidden"
        onclick={() => drawerOpen = true}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      <!-- Mobile logo -->
      <a href="/" class="flex items-center gap-2 lg:hidden">
        <img src="/logo.svg" alt="Radish" class="w-7 h-7" />
        <span class="text-sm font-bold text-primary">Radish</span>
      </a>

      <div class="flex items-center gap-2 ml-auto">
        <span class="text-xs text-base-content/50 hidden sm:inline">Theme:</span>
        <select data-choose-theme class="select select-bordered select-xs w-32 sm:w-40">
          {#each themes as theme}
            <option value={theme}>{theme}</option>
          {/each}
        </select>
      </div>
    </div>

    <main bind:this={mainEl} class="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      {@render children()}

      <footer class="mt-16 pt-6 pb-4 border-t border-base-300 text-center text-xs text-base-content/40">
        <p>
          <a href="https://radishplatform.com" target="_blank" class="link link-hover">Radish Platform</a>
          &mdash; Svelte 5 + DaisyUI v5 component library
        </p>
        <p class="mt-1">
          A project by <a href="https://abeedoo.com" target="_blank" class="link link-hover">Abeedoo</a>
        </p>
      </footer>
    </main>
  </div>
</div>
