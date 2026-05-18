# @abeedoo/radish-components

Svelte 5 component library wrapping DaisyUI v5. 70+ components with TypeScript, runes, snippets, and rest-props forwarding.

**[Live Playground & Docs](https://components.radishplatform.com)**

## Install

```bash
npm install @abeedoo/radish-components
```

**Peer dependencies** — your project needs these installed:

```bash
npm install svelte@^5 tailwindcss@^4 daisyui@^5
```

## Setup

### 1. Tailwind CSS + DaisyUI

Your `app.css` (or equivalent):

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: all;
}
```

### 2. Content scanning

If using `@tailwindcss/vite`, add a `@source` directive so Tailwind picks up classes from the library:

```css
@import "tailwindcss";
@source "../node_modules/@abeedoo/radish-components/dist/**/*.svelte";
@plugin "daisyui" {
  themes: all;
}
```

### 3. Import and use

```svelte
<script>
  import { Button, Card, Modal, toast } from '@abeedoo/radish-components';
</script>

<Button variant="primary" onclick={() => toast.success('Hello!')}>
  Click me
</Button>
```

## Components

### Actions
- **Button** — variants, sizes, outline, loading, disabled, link mode
- **Dropdown** — details or popover mode, position, alignment, hover
- **Swap** — toggle between two states with rotate/flip animation
- **ThemeController** — theme switcher

### Data Display
- **Accordion** + **AccordionItem** — collapsible sections, exclusive mode
- **Avatar** + **AvatarGroup** — image, placeholder, online status
- **Badge** — variants, sizes, auto-preset for common statuses
- **Carousel** — snap positions, vertical mode
- **Collapse** — single collapsible section
- **Countdown** — animated digit
- **Kbd** — keyboard key display
- **List** + **ListItem** — structured list
- **Stat** + **StatGroup** — label, value, description, figure
- **Status** — online/offline indicator dot
- **Table** — simple wrapper with zebra, pin rows/cols
- **Timeline** + **TimelineItem** — vertical/horizontal timeline

### Data Input
- **Checkbox** — with label, indeterminate, variants, sizes
- **FileInput** — styled file picker
- **FormField** — label + input/select/textarea + error + help text
- **Radio** — radio buttons with group binding
- **Range** — slider with min/max/step
- **Rating** — star rating with half-star support
- **Select** — styled select with options
- **TextInput** — text/email/password/number/url/date inputs
- **Textarea** — auto-resize option
- **Toggle** — switch toggle with label

### Feedback
- **Alert** — info, success, warning, error with auto-icons
- **Loading** — spinner, dots, ring, ball, bars, infinity
- **Progress** — determinate/indeterminate progress bar
- **RadialProgress** — circular progress
- **Skeleton** — content placeholder
- **Toast** — toast notifications (mount once in root layout)
- **Tooltip** — directional tooltips with variants

### Layout
- **Card** — title, description, headerActions snippet, compact, flat
- **Divider** — horizontal/vertical with text
- **Drawer** — sidebar drawer with overlay
- **Footer** — page footer
- **Hero** — hero section
- **Stack** — stacked cards effect

### Navigation
- **Breadcrumbs** — link trail
- **Dock** + **DockItem** — bottom navigation bar
- **Link** — styled anchor with variants
- **Menu** + **MenuItem** + **MenuTitle** — vertical/horizontal menus
- **Navbar** — top navigation with start/center/end
- **Pagination** — page numbers with prev/next
- **Steps** + **Step** — progress steps with variants

### Composites
- **ConfirmDialog** — delete/action confirmation modal
- **DataTable** — sortable, searchable, selectable, paginated data table
- **EmptyState** — icon + message + optional action
- **Icon** — 70+ inline SVG feather-style icons
- **JsonLd** — schema.org structured data (productLd, articleLd, breadcrumbLd, etc.)
- **Modal** — dialog with sizes, footer snippet, backdrop control
- **PageHeader** — title, subtitle, breadcrumbs, action buttons
- **Tabs** — tabbed content panels with variants

### Stores
- **toast** — `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`

## Patterns

### Event handlers

All interactive components forward rest props, so any DOM event handler works:

```svelte
<Button variant="primary" onclick={() => save()} onmouseover={highlight}>
  Save
</Button>

<TextInput bind:value={email} onfocus={() => clearError()} />
```

### Bindable values

Input components support two-way binding:

```svelte
<TextInput bind:value={name} />
<Checkbox bind:checked={agreed} />
<Toggle bind:checked={darkMode} />
<Select bind:value={role} options={roleOptions} />
<Rating bind:value={stars} />
<Range bind:value={volume} />
```

### Snippets for composition

Components use Svelte 5 snippets for flexible content:

```svelte
<Card title="Users">
  {#snippet headerActions()}
    <Button size="sm" variant="primary">Add User</Button>
  {/snippet}
  <p>Card content here.</p>
</Card>

<Modal bind:open={showModal} title="Edit">
  <p>Modal body.</p>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => showModal = false}>Cancel</Button>
    <Button variant="primary" onclick={save}>Save</Button>
  {/snippet}
</Modal>
```

### DataTable

```svelte
<DataTable
  items={users}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' }
  ]}
  actions={[
    { label: 'Edit', icon: 'edit', onClick: (item) => editUser(item) },
    { label: 'Delete', icon: 'trash', variant: 'error', onClick: (item) => deleteUser(item) }
  ]}
  searchable
  onSearch={(term) => goto(`?q=${term}`)}
  selectable
  bind:selectedItems
  onRowClick={(item) => goto(`/users/${item.id}`)}
  page={data.page}
  totalPages={data.totalPages}
  onPageChange={(p) => goto(`?page=${p}`)}
/>
```

### Toast notifications

Mount `<Toast />` once in your root layout, then call from anywhere:

```svelte
<!-- +layout.svelte -->
<script>
  import { Toast } from '@abeedoo/radish-components';
</script>
<Toast />
{@render children()}

<!-- any component -->
<script>
  import { toast } from '@abeedoo/radish-components';

  function handleSave() {
    try {
      await save();
      toast.success('Saved successfully');
    } catch (err) {
      toast.error('Failed to save');
    }
  }
</script>
```

## Development

```bash
# Build the package
cd packages/components
npm run build

# Run the playground/docs site
cd packages/components/browser
npm run dev
```

## License

MIT
