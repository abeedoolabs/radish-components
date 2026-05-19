# @abeedoo/radish-components — AI Context

Svelte 5 + DaisyUI v5 component library. 62 components. Import from `@abeedoo/radish-components`.

## Quick Reference

```svelte
import { Button, Card, Modal, DataTable, toast, Icon } from '@abeedoo/radish-components';
```

## Architecture

- **Svelte 5 runes**: `$props()`, `$state()`, `$derived()`, `$effect()`, `$bindable()`
- **Snippets**: `children`, named snippets (`footer`, `headerActions`, `trigger`, `on/off`)
- **Rest props**: All interactive components spread `{...rest}` — any HTML attribute/event works
- **DaisyUI classes only**: No custom CSS. Components compose DaisyUI utility classes via `cn()`.
- **Framework-agnostic**: No SvelteKit dependency. DataTable uses callbacks, not `goto()`.

## Component Catalog

### Actions
| Component | Key Props | Notes |
|-----------|-----------|-------|
| `Button` | `variant`, `size`, `outline`, `loading`, `disabled`, `href`, `children` | Renders `<a>` if `href` set |
| `Dropdown` | `label`, `variant`, `mode('details'\|'popover')`, `position`, `hover`, `trigger` | Children are `<li>` items |
| `Swap` | `active`(bindable), `rotate`, `flip`, `on`(snippet), `off`(snippet) | |
| `ThemeController` | `theme`(bindable), `themes[]` | |

### Data Display
| Component | Key Props | Notes |
|-----------|-----------|-------|
| `Accordion` | `exclusive`, `children` | Wrap `AccordionItem` children |
| `AccordionItem` | `title`, `name`, `checked`, `children` | Set same `name` for exclusive |
| `Avatar` | `src`, `placeholder`, `size`, `online`, `rounded` | |
| `AvatarGroup` | `children` | Overlapping avatars |
| `Badge` | `text`, `variant`('auto' uses status presets), `size`, `outline` | |
| `Carousel` | `snap('start'\|'center'\|'end')`, `vertical` | |
| `Collapse` | `title`, `open`, `icon('arrow'\|'plus')`, `children` | |
| `Countdown` | `value`(0-99) | |
| `Kbd` | `key`, `size` | |
| `List` | `size`, `children` | Wrap `ListItem` |
| `ListItem` | `children` | |
| `Stat` | `title`, `value`, `description`, `figure`(snippet) | |
| `StatGroup` | `horizontal`, `children` | Wrap `Stat` |
| `Status` | `variant` | Dot indicator |
| `Table` | `zebra`, `pinRows`, `pinCols`, `size`, `children` | Thin wrapper |
| `Timeline` | `vertical`, `compact`, `children` | Wrap `TimelineItem` |
| `TimelineItem` | `variant`, `start`(snippet), `middle`(snippet), `end`(snippet) | |

### Data Input
| Component | Key Props | Notes |
|-----------|-----------|-------|
| `Checkbox` | `checked`(bindable), `label`, `variant`, `size`, `indeterminate` | |
| `FileInput` | `variant`, `size`, `bordered`, `accept`, `multiple` | |
| `FormField` | `name`, `label`, `type`, `value`, `error`, `helpText`, `options`, `required` | All-in-one field |
| `Radio` | `value`, `group`(bindable), `label`, `variant`, `name` | |
| `Range` | `value`(bindable), `min`, `max`, `step`, `variant` | |
| `Rating` | `value`(bindable), `max`, `half`, `size` | Auto-generates unique name |
| `Select` | `value`(bindable), `options[]`, `placeholder`, `variant`, `size` | |
| `TextInput` | `value`(bindable), `type`, `placeholder`, `variant`, `size`, `bordered`, `ghost` | |
| `Textarea` | `value`(bindable), `rows`, `variant`, `size`, `bordered`, `ghost` | |
| `Toggle` | `checked`(bindable), `label`, `variant`, `size` | |

### Feedback
| Component | Key Props | Notes |
|-----------|-----------|-------|
| `Alert` | `variant`(ColorVariant), `icon`, `children` | Auto-icon per variant |
| `Loading` | `type`(spinner\|dots\|ring\|ball\|bars\|infinity), `size`, `variant` | |
| `Progress` | `value`, `max`, `variant` | Omit value for indeterminate |
| `RadialProgress` | `value`, `size`, `thickness`, `variant`, `children` | |
| `Skeleton` | `width`, `height`, `circle` | |
| `Toast` | — | Mount once in root layout |
| `Tooltip` | `tip`, `position`, `variant`, `open`, `children` | |

### Layout
| Component | Key Props | Notes |
|-----------|-----------|-------|
| `Card` | `title`, `description`, `compact`, `flat`, `headerActions`(snippet), `children` | |
| `Divider` | `text`, `vertical`, `variant` | |
| `Drawer` | `open`(bindable), `id`, `side`, `sidebar`(snippet), `children` | |
| `Footer` | `center`, `children` | |
| `Hero` | `overlay`(snippet), `children` | |
| `Stack` | `children` | Stacked cards effect |

### Navigation
| Component | Key Props | Notes |
|-----------|-----------|-------|
| `Breadcrumbs` | `items[{label, href?}]`, `size` | |
| `Dock` | `size`, `children` | Wrap `DockItem` |
| `DockItem` | `href`, `active`, `label`, `children` | |
| `Link` | `href`, `variant`, `hover`, `children` | |
| `Menu` | `horizontal`, `size`, `rounded`, `children` | Wrap `MenuItem`/`MenuTitle` |
| `MenuItem` | `href`, `active`, `disabled`, `children` | |
| `MenuTitle` | `title` | |
| `Navbar` | `start`(snippet), `center`(snippet), `end`(snippet) | |
| `Pagination` | `page`(bindable), `totalPages`, `size`, `onChange` | |
| `Step` | `variant`, `content`, `children` | |
| `Steps` | `vertical`, `children` | Wrap `Step` |

### Composites
| Component | Key Props | Notes |
|-----------|-----------|-------|
| `ConfirmDialog` | `open`(bindable), `title`, `message`, `confirmLabel`, `confirmVariant`, `onConfirm`, `onCancel` | |
| `DataGrid` | `items`, `columns[]`, `pagination`, `filters[]`, `bulkActions[]`, `onSearch`, `onSort`, `onPageChange`, `onFilterChange`, `onCellEdit`, `onSaveView`, `onDeleteView`, `onViewChange`, `savedViews[]`, `expandable`, `expandContent`(snippet), `exportable`, `entityName`, `searchQuery`, `sortBy`, `sortDir`, `idKey` | Feature-rich: inline editing, saved views, bulk ops, filters, column config, CSV export |
| `DataTable` | `items`, `columns[]`, `actions[]`, `searchable`, `onSearch`, `selectable`, `selectedItems`(bindable), `onRowClick`, `onPageChange`, `page`, `totalPages`, `rowClass`, `headerActions`(snippet) | |
| `EmptyState` | `icon`, `title`, `message`, `actions`(snippet) | |
| `Icon` | `name`, `size` | 40+ feather icons |
| `Modal` | `open`(bindable), `title`, `size`(sm\|md\|lg\|xl), `closeOnBackdrop`, `onclose`, `footer`(snippet) | |
| `PageHeader` | `title`, `subtitle`, `breadcrumbs[]`, `actions`(snippet) | |
| `Tabs` | `tabs[{key, label, content?}]`, `activeTab`(bindable), `variant`, `size`, `onChange` | |

### Stores
| Export | API |
|--------|-----|
| `toast` | `.success(msg, duration?)`, `.error(msg)`, `.warning(msg)`, `.info(msg)`, `.dismiss(id)`, `.clear()` |

## Shared Types

```typescript
type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'neutral';
type ColorVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
```

## Available Icons

home, users, settings, key, database, activity, edit, trash, plus, search, x, check,
alert-triangle, chevron-up, chevron-down, chevron-left, chevron-right, eye, lock, unlock,
refresh-cw, log-out, arrow-left, check-circle, alert-circle, info, more-vertical,
layout-dashboard, file-text, clock, heart, star, mail, bell, zap, globe, link, download,
upload, filter, menu, external-link, shield

## Common Patterns

```svelte
<!-- Rest props: any HTML attribute/event -->
<Button onclick={handler} aria-label="Save" data-testid="save" />

<!-- Bindable values -->
<TextInput bind:value={name} />
<Checkbox bind:checked={agreed} />
<Select bind:value={role} options={opts} />

<!-- Snippets for composition -->
<Card title="Title">
  {#snippet headerActions()}<Button size="sm">Action</Button>{/snippet}
  Content here
</Card>

<!-- Toast: mount once, call anywhere -->
<Toast />  <!-- in root layout -->
toast.success('Done');  <!-- anywhere -->
```

@/Users/ctmeece/Projects/abeedoo-knowledge/contexts/base/CONTEXT.md
@/Users/ctmeece/Projects/abeedoo-knowledge/AGENT_INSTRUCTIONS.md
