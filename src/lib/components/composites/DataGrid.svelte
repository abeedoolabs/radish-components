<script lang="ts">
/**
 * DataGrid — feature-rich data grid with customizable columns, saved views,
 * bulk operations, filters, inline editing, expandable rows, and CSV export.
 * Framework-agnostic: no SvelteKit dependencies. Uses callbacks for all interactions.
 */
import type { Snippet } from 'svelte';
import Icon from './Icon.svelte';
import { cn } from '../../utils.js';

type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  visible?: boolean;
  editable?: boolean;
  editType?: 'text' | 'number' | 'select' | 'boolean';
  editOptions?: { value: string; label: string }[];
  render?: (value: any, item: any) => string;
};

type Filter = {
  key: string;
  label: string;
  type: 'select' | 'text' | 'boolean' | 'range';
  options?: { value: string; label: string }[];
  value?: string;
};

type BulkAction = {
  label: string;
  icon?: string;
  variant?: 'default' | 'danger' | 'primary';
  confirm?: string;
  action: (ids: string[]) => void;
};

type SavedView = {
  id?: string;
  name: string;
  columns: string[];
  columnOrder: string[];
  filters: Record<string, string>;
  sort?: { key: string; dir: string };
  isShared?: boolean;
  isDefault?: boolean;
};

let {
  items = [],
  columns: allColumns = [] as Column[],
  pagination = { page: 1, totalCount: 0, totalPages: 0 },
  filters = [] as Filter[],
  bulkActions = [] as BulkAction[],
  onRowClick,
  onCellEdit,
  entityName = 'items',
  searchPlaceholder = 'Search...',
  searchQuery = '',
  sortBy = '',
  sortDir = 'asc' as 'asc' | 'desc',
  exportable = true,
  savedViews = [] as SavedView[],
  onSaveView,
  onDeleteView,
  expandable = false,
  expandContent,
  onSearch,
  onSort,
  onPageChange,
  onFilterChange,
  onViewChange,
  idKey = 'id',
  title = '',
  loading = false,
  emptyMessage = 'No items found.',
  headerActions,
  class: className = '',
  ...rest
}: {
  items: any[];
  columns: Column[];
  pagination?: { page: number; totalCount: number; totalPages: number };
  filters?: Filter[];
  bulkActions?: BulkAction[];
  onRowClick?: (item: any) => void;
  onCellEdit?: (itemId: string, key: string, value: any) => void;
  entityName?: string;
  searchPlaceholder?: string;
  searchQuery?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  exportable?: boolean;
  savedViews?: SavedView[];
  onSaveView?: (view: SavedView) => void;
  onDeleteView?: (viewId: string) => void;
  expandable?: boolean;
  expandContent?: any;
  onSearch?: (query: string) => void;
  onSort?: (key: string, dir: 'asc' | 'desc') => void;
  onPageChange?: (page: number) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  onViewChange?: (view: SavedView | null) => void;
  idKey?: string;
  title?: string;
  loading?: boolean;
  emptyMessage?: string;
  headerActions?: Snippet;
  class?: string;
  [key: string]: any;
} = $props();

// Active view tracking
let activeViewId = $state<string | null>(null);
let activeViewName = $state<string | null>(null);
let viewShared = $state(false);

// Column visibility, order, and edit mode
let visibleColumnKeys = $state<string[]>(allColumns.filter(c => c.visible !== false).map(c => c.key));
let columnOrder = $state<string[]>(allColumns.map(c => c.key));
let editableColumnKeys = $state<Set<string>>(new Set());
let showViewSave = $state(false);
let viewName = $state('');

// Panel visibility
let showFilterPanel = $state(false);

// Search within columns and filters
let columnSearch = $state('');
let filterSearch = $state('');

// Active filters (applied filter chips)
let activeFilters = $state<Record<string, string>>(
  Object.fromEntries(filters.filter(f => f.value).map(f => [f.key, f.value!]))
);

// Sort state (controlled via props)
let currentSort = $state(sortBy);
let currentDir = $state<'asc' | 'desc'>(sortDir);

// Column drag
let dragCol = $state<string | null>(null);

// Selection
let selectedIds = $state<Set<string>>(new Set());
let selectAll = $state(false);

// Expanded rows
let expandedIds = $state<Set<string>>(new Set());

// Inline editing
let editingCell = $state<{ id: string; key: string } | null>(null);
let editingValue = $state<any>(null);

// Search input (local, debounced)
let searchInput = $state(searchQuery);
let searchTimeout: ReturnType<typeof setTimeout>;

// Sync props when they change externally
$effect(() => { currentSort = sortBy; });
$effect(() => { currentDir = sortDir; });
$effect(() => { searchInput = searchQuery; });

// Filtered column list for the panel
const filteredColumns = $derived(
  columnSearch.trim()
    ? allColumns.filter(c => (c.label || c.key).toLowerCase().includes(columnSearch.toLowerCase()))
    : allColumns
);

// Filtered filter list for the panel
const filteredFilters = $derived(
  filterSearch.trim()
    ? filters.filter(f => f.label.toLowerCase().includes(filterSearch.toLowerCase()))
    : filters
);

const activeFilterCount = $derived(Object.keys(activeFilters).filter(k => activeFilters[k]).length);

const visibleColumns = $derived(
  columnOrder.filter(k => visibleColumnKeys.includes(k)).map(k => allColumns.find(c => c.key === k)!).filter(Boolean)
);

// Page numbers for pagination
let pageNumbers = $derived.by(() => {
  if (!pagination.totalPages || pagination.totalPages <= 1) return [];
  const current = pagination.page || 1;
  const total = pagination.totalPages;
  const result: (number | '...')[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i);
  } else {
    result.push(1);
    if (current > 3) result.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      result.push(i);
    }
    if (current < total - 2) result.push('...');
    result.push(total);
  }
  return result;
});

function handleSort(key: string) {
  const dir = currentSort === key && currentDir === 'asc' ? 'desc' : 'asc';
  currentSort = key;
  currentDir = dir;
  onSort?.(key, dir);
}

function onColDragStart(key: string) { dragCol = key; }
function onColDragOver(e: DragEvent, targetKey: string) {
  e.preventDefault();
  if (!dragCol || dragCol === targetKey) return;
  const from = columnOrder.indexOf(dragCol), to = columnOrder.indexOf(targetKey);
  if (from === -1 || to === -1) return;
  const next = [...columnOrder]; next.splice(from, 1); next.splice(to, 0, dragCol);
  columnOrder = next;
}
function onColDragEnd() { dragCol = null; }

function handleSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => onSearch?.(searchInput), 300);
}

function toggleSelectAll() {
  if (selectAll) { selectedIds = new Set(); selectAll = false; }
  else { selectedIds = new Set(items.map(i => i[idKey])); selectAll = true; }
}
function toggleSelect(id: string) {
  const next = new Set(selectedIds);
  if (next.has(id)) next.delete(id); else next.add(id);
  selectedIds = next; selectAll = next.size === items.length;
}
function toggleExpand(id: string) {
  const next = new Set(expandedIds);
  if (next.has(id)) next.delete(id); else next.add(id);
  expandedIds = next;
}
function toggleColumn(key: string) {
  visibleColumnKeys = visibleColumnKeys.includes(key) ? visibleColumnKeys.filter(k => k !== key) : [...visibleColumnKeys, key];
}
function toggleEditable(key: string) {
  const next = new Set(editableColumnKeys);
  if (next.has(key)) next.delete(key); else next.add(key);
  editableColumnKeys = next;
}

function startEdit(id: string, key: string, value: any) {
  editingCell = { id, key }; editingValue = value;
}
function commitEdit() {
  if (editingCell && onCellEdit) onCellEdit(editingCell.id, editingCell.key, editingValue);
  editingCell = null;
}
function cancelEdit() { editingCell = null; }

function moveColumnUp(key: string) {
  const idx = columnOrder.indexOf(key);
  if (idx <= 0) return;
  const next = [...columnOrder]; [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
  columnOrder = next;
}
function moveColumnDown(key: string) {
  const idx = columnOrder.indexOf(key);
  if (idx === -1 || idx >= columnOrder.length - 1) return;
  const next = [...columnOrder]; [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
  columnOrder = next;
}

function exportCSV() {
  const headers = visibleColumns.map(c => c.label || c.key);
  const rows = items.map(item => visibleColumns.map(c => {
    const val = item[c.key]; return typeof val === 'string' && val.includes(',') ? `"${val}"` : String(val ?? '');
  }));
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = `${entityName}-export.csv`; a.click(); URL.revokeObjectURL(url);
}

function saveView() {
  if (!viewName.trim() || !onSaveView) return;
  const config: SavedView = {
    name: viewName.trim(),
    columns: visibleColumnKeys,
    columnOrder,
    filters: { ...activeFilters },
    sort: currentSort ? { key: currentSort, dir: currentDir } : undefined,
    isShared: viewShared
  };
  onSaveView(config);
  showViewSave = false; viewName = ''; viewShared = false;
}

function applyView(view: SavedView) {
  activeViewId = view.id || null;
  activeViewName = view.name || null;
  if (view.columns) visibleColumnKeys = view.columns;
  if (view.columnOrder) columnOrder = view.columnOrder;
  if (view.filters) activeFilters = { ...view.filters };
  if (view.sort) {
    currentSort = view.sort.key;
    currentDir = view.sort.dir as 'asc' | 'desc';
  }
  onViewChange?.(view);
}

function resetToDefault() {
  activeViewId = null;
  activeViewName = null;
  visibleColumnKeys = allColumns.filter(c => c.visible !== false).map(c => c.key);
  columnOrder = allColumns.map(c => c.key);
  editableColumnKeys = new Set();
  activeFilters = {};
  currentSort = '';
  currentDir = 'asc';
  onViewChange?.(null);
}

function applyFilter(key: string, value: string) {
  if (value) { activeFilters = { ...activeFilters, [key]: value }; }
  else { const next = { ...activeFilters }; delete next[key]; activeFilters = next; }
  onFilterChange?.({ ...activeFilters });
}

function removeFilter(key: string) {
  const next = { ...activeFilters }; delete next[key]; activeFilters = next;
  onFilterChange?.({ ...activeFilters });
}

function clearAllFilters() {
  activeFilters = {};
  onFilterChange?.({});
}

function getFilterLabel(key: string, value: string): string {
  const filter = filters.find(f => f.key === key);
  if (!filter) return `${key}: ${value}`;
  if (filter.type === 'boolean') return `${filter.label}: ${value === 'true' ? 'Yes' : 'No'}`;
  if (filter.options) {
    const opt = filter.options.find(o => o.value === value);
    return `${filter.label}: ${opt?.label || value}`;
  }
  return `${filter.label}: ${value}`;
}
</script>

<div class={cn('space-y-3', className)} {...rest}>
  <!-- Header -->
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-baseline gap-3">
      {#if title}
        <h2 class="text-lg font-semibold">{title}</h2>
      {/if}
      {#if pagination.totalCount !== undefined}
        <span class="text-sm text-base-content/50">{pagination.totalCount} {entityName}{pagination.totalCount !== 1 ? 's' : ''}</span>
      {/if}
      {#if selectedIds.size > 0}
        <span class="text-sm text-primary font-medium">{selectedIds.size} selected</span>
      {/if}
    </div>

    <div class="flex items-center gap-2">
      {#if onSearch}
        <div class="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            class="input input-bordered input-sm w-64 pl-9"
            bind:value={searchInput}
            oninput={handleSearch}
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">
            <Icon name="search" size={14} />
          </span>
          {#if searchInput}
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
              onclick={() => { searchInput = ''; onSearch?.(''); }}
            >
              <Icon name="x" size={12} />
            </button>
          {/if}
        </div>
      {/if}

      <!-- Filter toggle -->
      {#if filters.length > 0}
        <button class="btn btn-sm {showFilterPanel ? 'btn-primary' : 'btn-ghost'} gap-1" onclick={() => showFilterPanel = !showFilterPanel}>
          <Icon name="filter" size={14} />
          Filters
          {#if activeFilterCount > 0}<span class="badge badge-xs badge-primary">{activeFilterCount}</span>{/if}
        </button>
      {/if}

      <!-- Bulk actions dropdown -->
      {#if selectedIds.size > 0 && bulkActions.length > 0}
        <div class="dropdown dropdown-end">
          <button class="btn btn-sm btn-outline gap-1">
            Actions <Icon name="chevron-down" size={12} />
          </button>
          <ul class="dropdown-content z-50 mt-1 w-48 rounded-lg border border-base-300 bg-base-100 p-1 shadow-xl">
            {#each bulkActions as action}
              <li>
                <button
                  class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-base-200 {action.variant === 'danger' ? 'text-error' : ''}"
                  onclick={() => {
                    if (action.confirm && !confirm(action.confirm)) return;
                    action.action([...selectedIds]);
                  }}
                >
                  {#if action.icon}<Icon name={action.icon} size={14} />{/if}
                  {action.label}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Saved views -->
      {#if savedViews.length > 0 || onSaveView}
        <div class="dropdown dropdown-end">
          <button class="btn btn-ghost btn-sm gap-1">
            <Icon name="eye" size={14} />
            {activeViewName || 'Views'}
          </button>
          <div class="dropdown-content z-50 mt-1 w-64 rounded-lg border border-base-300 bg-base-100 p-2 shadow-xl">
            <button class="flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm hover:bg-base-200 {!activeViewId ? 'bg-primary/10 text-primary font-medium' : ''}"
              onclick={() => resetToDefault()}>
              <Icon name="layout-dashboard" size={12} />
              Default View
            </button>

            {#if savedViews.length > 0}
              <div class="my-1 border-t border-base-300"></div>
              {#each savedViews as view}
                <div class="flex items-center gap-1 rounded hover:bg-base-200 {activeViewId === view.id ? 'bg-primary/10' : ''}">
                  <button class="flex flex-1 items-center gap-2 px-3 py-1.5 text-left text-sm {activeViewId === view.id ? 'text-primary font-medium' : ''}"
                    onclick={() => applyView(view)}>
                    <Icon name={view.isShared ? 'users' : 'eye'} size={12} />
                    {view.name}
                    {#if view.isDefault}<span class="badge badge-primary badge-xs ml-1">default</span>{/if}
                  </button>
                  {#if onDeleteView}
                    <button class="btn btn-ghost btn-xs btn-square opacity-0 group-hover:opacity-100 hover:text-error" onclick={() => onDeleteView?.(view.id!)} aria-label="Delete">
                      <Icon name="x" size={10} />
                    </button>
                  {/if}
                </div>
              {/each}
            {/if}

            {#if onSaveView}
              <div class="mt-2 border-t border-base-300 pt-2">
                {#if showViewSave}
                  <div class="space-y-1">
                    <input class="input input-bordered input-xs w-full" bind:value={viewName} placeholder="View name" />
                    <label class="flex cursor-pointer items-center gap-1.5">
                      <input type="checkbox" class="checkbox checkbox-xs" bind:checked={viewShared} />
                      <span class="text-[10px]">Share with team</span>
                    </label>
                    <div class="flex gap-1">
                      <button class="btn btn-primary btn-xs flex-1" onclick={saveView}>Save View</button>
                      <button class="btn btn-ghost btn-xs" onclick={() => showViewSave = false}>Cancel</button>
                    </div>
                  </div>
                {:else}
                  <button class="btn btn-ghost btn-xs w-full gap-1" onclick={() => showViewSave = true}>
                    <Icon name="plus" size={10} /> Save Current View
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Export -->
      {#if exportable}
        <button class="btn btn-ghost btn-sm btn-square" onclick={exportCSV} aria-label="Export CSV"><Icon name="download" size={14} /></button>
      {/if}

      {#if headerActions}
        {@render headerActions()}
      {/if}
    </div>
  </div>

  <!-- Active filter chips -->
  {#if activeFilterCount > 0}
    <div class="flex flex-wrap items-center gap-1.5">
      <span class="text-xs text-base-content/40">Filters:</span>
      {#each Object.entries(activeFilters) as [key, value]}
        {#if value}
          <span class="badge badge-sm gap-1 pr-1">
            {getFilterLabel(key, value)}
            <button class="hover:text-error" onclick={() => removeFilter(key)} aria-label="Remove filter">&times;</button>
          </span>
        {/if}
      {/each}
      <button class="text-xs text-error/60 hover:text-error" onclick={clearAllFilters}>Clear all</button>
    </div>
  {/if}

  <!-- Expandable filter & column panel -->
  {#if showFilterPanel}
    <div class="rounded-lg border border-base-300 bg-base-100 p-3 space-y-4">
      <!-- Filters section with search -->
      {#if filters.length > 0}
        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-semibold text-base-content/50">Filters ({filters.length})</p>
            <input type="text" class="input input-bordered input-xs w-40" placeholder="Search filters..."
              bind:value={filterSearch} />
          </div>
          <div class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 max-h-48 overflow-y-auto">
            {#each filteredFilters as filter}
              {#if filter.type === 'select' && filter.options}
                <label class="form-control w-full">
                  <span class="label-text text-[10px] text-base-content/50">{filter.label}</span>
                  <select class="select select-bordered select-xs w-full" value={filter.value || ''}
                    onchange={(e) => applyFilter(filter.key, (e.target as HTMLSelectElement).value)}>
                    <option value="">All</option>
                    {#each filter.options as opt}<option value={opt.value}>{opt.label}</option>{/each}
                  </select>
                </label>
              {:else if filter.type === 'text'}
                <label class="form-control w-full">
                  <span class="label-text text-[10px] text-base-content/50">{filter.label}</span>
                  <input type="text" class="input input-bordered input-xs w-full" value={filter.value || ''}
                    onchange={(e) => applyFilter(filter.key, (e.target as HTMLInputElement).value)} />
                </label>
              {:else if filter.type === 'boolean'}
                <label class="form-control w-full">
                  <span class="label-text text-[10px] text-base-content/50">{filter.label}</span>
                  <select class="select select-bordered select-xs w-full" value={filter.value || ''}
                    onchange={(e) => applyFilter(filter.key, (e.target as HTMLSelectElement).value)}>
                    <option value="">Any</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </label>
              {/if}
            {/each}
          </div>
          {#if filterSearch && filteredFilters.length === 0}
            <p class="text-xs text-base-content/30 mt-1">No filters matching "{filterSearch}"</p>
          {/if}
        </div>
      {/if}

      <!-- Column configuration with search -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-semibold text-base-content/50">Columns ({allColumns.length})</p>
          <input type="text" class="input input-bordered input-xs w-40" placeholder="Search columns..."
            bind:value={columnSearch} />
        </div>
        <div class="grid grid-cols-2 gap-1 md:grid-cols-4 lg:grid-cols-6 max-h-48 overflow-y-auto">
          {#each filteredColumns as col (col.key)}
            <div class="flex items-center gap-1 rounded border border-base-300 px-1.5 py-1 text-[11px] {visibleColumnKeys.includes(col.key) ? 'bg-base-100' : 'bg-base-200/50 opacity-50'}">
              <button class="text-base-content/15 hover:text-base-content/50" onclick={() => moveColumnUp(col.key)} aria-label="Left">
                <Icon name="chevron-left" size={9} />
              </button>
              <input type="checkbox" class="checkbox checkbox-xs" checked={visibleColumnKeys.includes(col.key)}
                onchange={() => toggleColumn(col.key)} />
              <span class="flex-1 truncate">{col.label || col.key}</span>
              {#if col.editable}
                <button
                  class="rounded px-0.5 text-[8px] leading-none {editableColumnKeys.has(col.key) ? 'bg-primary/20 text-primary font-bold' : 'text-base-content/25'}"
                  onclick={() => toggleEditable(col.key)}
                >
                  {editableColumnKeys.has(col.key) ? 'E' : 'V'}
                </button>
              {/if}
              <button class="text-base-content/15 hover:text-base-content/50" onclick={() => moveColumnDown(col.key)} aria-label="Right">
                <Icon name="chevron-right" size={9} />
              </button>
            </div>
          {/each}
        </div>
        {#if columnSearch && filteredColumns.length === 0}
          <p class="text-xs text-base-content/30 mt-1">No columns matching "{columnSearch}"</p>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Loading -->
  {#if loading}
    <div class="overflow-x-auto rounded-lg border border-base-300">
      <table class="table table-zebra">
        <thead>
          <tr>
            {#if bulkActions.length > 0}<th class="w-10"></th>{/if}
            {#if expandable}<th class="w-10"></th>{/if}
            {#each visibleColumns as col}
              <th>{col.label}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each Array(5) as _}
            <tr>
              {#if bulkActions.length > 0}<td><div class="skeleton h-4 w-4"></div></td>{/if}
              {#if expandable}<td><div class="skeleton h-4 w-4"></div></td>{/if}
              {#each visibleColumns as _col}
                <td><div class="skeleton h-4 w-24"></div></td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  <!-- Empty -->
  {:else if items.length === 0}
    <div class="text-center py-12 text-base-content/50 border border-base-300 rounded-lg bg-base-100">
      <Icon name="database" size={32} class="mx-auto mb-2 opacity-30" />
      <p>{emptyMessage}</p>
    </div>

  <!-- Table -->
  {:else}
    <div class="overflow-x-auto rounded-lg border border-base-300 bg-base-100">
      <table class="table table-zebra">
        <thead>
          <tr>
            {#if bulkActions.length > 0}
              <th class="w-10">
                <input type="checkbox" class="checkbox checkbox-sm" checked={selectAll} onchange={toggleSelectAll} />
              </th>
            {/if}
            {#if expandable}<th class="w-10"></th>{/if}
            {#each visibleColumns as col (col.key)}
              <th
                class={cn(
                  col.align === 'right' && 'text-right',
                  dragCol === col.key && 'opacity-40',
                  col.sortable && 'cursor-pointer select-none hover:bg-base-200 transition-colors',
                  !col.sortable && 'select-none'
                )}
                style={col.width ? `width:${col.width}` : ''}
                draggable="true"
                ondragstart={() => onColDragStart(col.key)}
                ondragover={(e) => onColDragOver(e, col.key)}
                ondragend={onColDragEnd}
                onclick={() => col.sortable && handleSort(col.key)}
              >
                <span class="inline-flex items-center gap-1">
                  {col.label}
                  {#if col.sortable}
                    {#if currentSort === col.key}
                      <Icon name={currentDir === 'asc' ? 'chevron-up' : 'chevron-down'} size={14} />
                    {:else}
                      <span class="opacity-20"><Icon name="chevron-up" size={14} /></span>
                    {/if}
                  {/if}
                </span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each items as item (item[idKey])}
            <tr
              class={cn('hover', onRowClick && 'cursor-pointer')}
              onclick={() => { if (onRowClick && !selectedIds.size && !editingCell) onRowClick(item); }}
            >
              {#if bulkActions.length > 0}
                <td onclick={(e) => e.stopPropagation()}>
                  <input type="checkbox" class="checkbox checkbox-sm" checked={selectedIds.has(item[idKey])}
                    onchange={() => toggleSelect(item[idKey])} />
                </td>
              {/if}
              {#if expandable}
                <td>
                  <button class="btn btn-ghost btn-xs btn-square" onclick={(e) => { e.stopPropagation(); toggleExpand(item[idKey]); }}>
                    <Icon name={expandedIds.has(item[idKey]) ? 'chevron-down' : 'chevron-right'} size={14} />
                  </button>
                </td>
              {/if}
              {#each visibleColumns as col}
                {@const isEditing = editingCell?.id === item[idKey] && editingCell?.key === col.key}
                {@const canEdit = col.editable && editableColumnKeys.has(col.key)}
                <td class={col.align === 'right' ? 'text-right' : ''} onclick={(e) => { if (canEdit) { e.stopPropagation(); startEdit(item[idKey], col.key, item[col.key]); } }}>
                  {#if isEditing}
                    {#if col.editType === 'select' && col.editOptions}
                      <select class="select select-bordered select-sm w-full" bind:value={editingValue}
                        onchange={commitEdit} onblur={commitEdit}>
                        {#each col.editOptions as opt}<option value={opt.value}>{opt.label}</option>{/each}
                      </select>
                    {:else if col.editType === 'boolean'}
                      <input type="checkbox" class="toggle toggle-primary toggle-sm" checked={editingValue}
                        onchange={(e) => { editingValue = (e.target as HTMLInputElement).checked; commitEdit(); }} />
                    {:else if col.editType === 'number'}
                      <input type="number" class="input input-bordered input-sm w-20" bind:value={editingValue}
                        onblur={commitEdit} onkeydown={(e) => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') cancelEdit(); }} autofocus />
                    {:else}
                      <input type="text" class="input input-bordered input-sm w-full" bind:value={editingValue}
                        onblur={commitEdit} onkeydown={(e) => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') cancelEdit(); }} autofocus />
                    {/if}
                  {:else if col.render}
                    {@html col.render(item[col.key], item)}
                  {:else}
                    <span class="{canEdit ? 'border-b border-dashed border-base-content/20 cursor-text' : ''}">{item[col.key] ?? '—'}</span>
                  {/if}
                </td>
              {/each}
            </tr>
            {#if expandable && expandedIds.has(item[idKey]) && expandContent}
              <tr><td colspan={visibleColumns.length + (bulkActions.length > 0 ? 1 : 0) + (expandable ? 1 : 0)} class="bg-base-200/30 p-0">
                {@render expandContent(item)}
              </td></tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    {#if pageNumbers.length > 0 && onPageChange}
      <div class="flex items-center justify-between">
        <span class="text-sm text-base-content/50">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <div class="join">
          <button
            class="join-item btn btn-sm"
            disabled={pagination.page === 1}
            onclick={() => onPageChange?.(pagination.page - 1)}
          >
            &laquo;
          </button>
          {#each pageNumbers as p}
            {#if p === '...'}
              <button class="join-item btn btn-sm btn-disabled">...</button>
            {:else}
              <button
                class={cn('join-item btn btn-sm', pagination.page === p && 'btn-active')}
                onclick={() => onPageChange?.(p)}
              >
                {p}
              </button>
            {/if}
          {/each}
          <button
            class="join-item btn btn-sm"
            disabled={pagination.page === pagination.totalPages}
            onclick={() => onPageChange?.(pagination.page + 1)}
          >
            &raquo;
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>
