<script lang="ts">
  const components = {
    'Actions': ['Button', 'Dropdown', 'Swap', 'ThemeController'],
    'Data Display': ['Accordion', 'Avatar', 'Badge', 'Carousel', 'Collapse', 'Countdown', 'Kbd', 'List', 'Stat', 'Status', 'Table', 'Timeline'],
    'Data Input': ['Checkbox', 'FileInput', 'FormField', 'Radio', 'Range', 'Rating', 'Select', 'TextInput', 'Textarea', 'Toggle'],
    'Feedback': ['Alert', 'Loading', 'Progress', 'RadialProgress', 'Skeleton', 'Toast', 'Tooltip'],
    'Layout': ['Card', 'Divider', 'Drawer', 'Footer', 'Hero', 'Stack'],
    'Navigation': ['Breadcrumbs', 'Dock', 'Link', 'Menu', 'Navbar', 'Pagination', 'Steps'],
    'Composites': ['ConfirmDialog', 'DataGrid', 'DataTable', 'EmptyState', 'Icon', 'Modal', 'PageHeader', 'Tabs']
  };

  const total = Object.values(components).flat().length;
</script>

<div class="max-w-4xl">
  <h1 class="text-4xl font-bold mb-2"><span class="text-primary">Radish</span> Components</h1>
  <p class="text-lg text-base-content/60 mb-8">
    {total} Svelte 5 components wrapping DaisyUI v5. Built with runes, snippets, and TypeScript.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each Object.entries(components) as [category, items]}
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-lg">
            {category}
            <span class="badge badge-sm badge-ghost">{items.length}</span>
          </h2>
          <div class="flex flex-wrap gap-1 mt-2">
            {#each items as item}
              <span class="badge badge-outline badge-sm">{item}</span>
            {/each}
          </div>
          <div class="card-actions justify-end mt-3">
            <a href="/{category.toLowerCase().replace(' ', '-')}" class="btn btn-sm btn-primary btn-outline">
              Browse
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
