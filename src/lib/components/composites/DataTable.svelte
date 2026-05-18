<script lang="ts">
/**
 * DataTable component - Sortable, searchable data table with pagination
 * Framework-agnostic: no SvelteKit dependencies. Uses callbacks for all interactions.
 */
import type { Snippet } from 'svelte';
import Icon from './Icon.svelte';
import { cn } from '../../utils.js';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: any) => string;
  renderHtml?: (item: any) => string;
  className?: string;
}

interface Action {
  label: string;
  icon?: string;
  href?: (item: any) => string;
  onClick?: (item: any) => void;
  variant?: string;
  hidden?: (item: any) => boolean;
}

let {
  items = [],
  columns = [],
  actions = [],
  searchable = false,
  searchValue = '',
  onSearch,
  sortBy = '',
  sortDir = 'asc' as 'asc' | 'desc',
  onSort,
  title = '',
  description = '',
  emptyMessage = 'No records found.',
  totalCount,
  page,
  totalPages,
  onPageChange,
  nextCursor,
  onLoadMore,
  loading = false,
  selectable = false,
  selectedItems = $bindable([] as any[]),
  onSelectionChange,
  onRowClick,
  rowClass,
  idKey = 'id',
  headerActions,
  class: className = ''
}: {
  items: any[];
  columns: Column[];
  actions?: Action[];
  searchable?: boolean;
  searchValue?: string;
  onSearch?: (term: string) => void;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (field: string, dir: 'asc' | 'desc') => void;
  title?: string;
  description?: string;
  emptyMessage?: string;
  totalCount?: number;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  nextCursor?: string;
  onLoadMore?: () => void;
  loading?: boolean;
  selectable?: boolean;
  selectedItems?: any[];
  onSelectionChange?: (items: any[]) => void;
  onRowClick?: (item: any) => void;
  rowClass?: (item: any) => string;
  idKey?: string;
  headerActions?: Snippet;
  class?: string;
} = $props();

let search = $state(searchValue);
let currentSortBy = $state(sortBy);
let currentSortDir = $state(sortDir);
let debounceTimer: ReturnType<typeof setTimeout>;

// Client-side sorted items
let sortedItems = $derived.by(() => {
  if (!currentSortBy) return items;
  const col = columns.find(c => c.key === currentSortBy);
  if (!col) return items;
  return [...items].sort((a, b) => {
    let aVal = a, bVal = b;
    for (const part of col.key.split('.')) { aVal = aVal?.[part]; bVal = bVal?.[part]; }
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return currentSortDir === 'desc' ? -cmp : cmp;
  });
});

// Selection
let allSelected = $derived(
  selectable && sortedItems.length > 0 &&
  sortedItems.every(item => selectedItems.some(s => s[idKey] === item[idKey]))
);

function toggleSelectAll() {
  if (allSelected) {
    selectedItems = [];
  } else {
    selectedItems = [...sortedItems];
  }
  onSelectionChange?.(selectedItems);
}

function toggleSelectItem(item: any) {
  const idx = selectedItems.findIndex(s => s[idKey] === item[idKey]);
  if (idx >= 0) {
    selectedItems = selectedItems.filter((_, i) => i !== idx);
  } else {
    selectedItems = [...selectedItems, item];
  }
  onSelectionChange?.(selectedItems);
}

function isSelected(item: any): boolean {
  return selectedItems.some(s => s[idKey] === item[idKey]);
}

function handleSearchInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  search = value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    onSearch?.(value.trim());
  }, 300);
}

function clearSearch() {
  search = '';
  onSearch?.('');
}

function handleSort(column: Column) {
  if (!column.sortable) return;
  const newDir = currentSortBy === column.key && currentSortDir === 'asc' ? 'desc' : 'asc';
  if (onSort) {
    onSort(column.key, newDir);
  } else {
    currentSortBy = column.key;
    currentSortDir = newDir;
  }
}

function handleRowClick(item: any, e: MouseEvent) {
  // Don't trigger row click if user clicked an action button/link or checkbox
  const target = e.target as HTMLElement;
  if (target.closest('button, a, input[type="checkbox"], .btn')) return;
  onRowClick?.(item);
}

function getCellValue(item: any, column: Column): string {
  if (column.renderHtml) return column.renderHtml(item);
  if (column.render) return escapeHtml(column.render(item));

  let value: any = item;
  for (const part of column.key.split('.')) {
    value = value?.[part];
  }
  if (value === null || value === undefined) return '<span class="text-base-content/40">-</span>';
  return escapeHtml(String(value));
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Page numbers for pagination
let pageNumbers = $derived.by(() => {
  if (!totalPages || totalPages <= 1) return [];
  const current = page || 1;
  const result: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) result.push(i);
  } else {
    result.push(1);
    if (current > 3) result.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      result.push(i);
    }
    if (current < totalPages - 2) result.push('...');
    result.push(totalPages);
  }
  return result;
});
</script>

<div class={cn('space-y-3', className)}>
  <!-- Header -->
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-baseline gap-3">
      {#if title}
        <h2 class="text-lg font-semibold">{title}</h2>
      {/if}
      {#if totalCount !== undefined}
        <span class="text-sm text-base-content/50">{totalCount} item{totalCount !== 1 ? 's' : ''}</span>
      {/if}
      {#if selectable && selectedItems.length > 0}
        <span class="text-sm text-primary font-medium">{selectedItems.length} selected</span>
      {/if}
    </div>

    <div class="flex items-center gap-2">
      {#if searchable}
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="input input-bordered input-sm w-64 pl-9"
            bind:value={search}
            oninput={handleSearchInput}
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">
            <Icon name="search" size={14} />
          </span>
          {#if search}
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
              onclick={clearSearch}
            >
              <Icon name="x" size={12} />
            </button>
          {/if}
        </div>
      {/if}
      {#if headerActions}
        {@render headerActions()}
      {/if}
    </div>
  </div>

  {#if description}
    <p class="text-sm text-base-content/60">{description}</p>
  {/if}

  <!-- Loading -->
  {#if loading}
    <div class="overflow-x-auto rounded-lg border border-base-300">
      <table class="table">
        <thead>
          <tr>
            {#if selectable}<th class="w-10"></th>{/if}
            {#each columns as column}
              <th>{column.label}</th>
            {/each}
            {#if actions.length > 0}
              <th class="text-right">Actions</th>
            {/if}
          </tr>
        </thead>
        <tbody>
          {#each Array(5) as _}
            <tr>
              {#if selectable}<td><div class="skeleton h-4 w-4"></div></td>{/if}
              {#each columns as _col}
                <td><div class="skeleton h-4 w-24"></div></td>
              {/each}
              {#if actions.length > 0}
                <td><div class="skeleton h-4 w-16 ml-auto"></div></td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  <!-- Empty -->
  {:else if sortedItems.length === 0}
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
            {#if selectable}
              <th class="w-10">
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  checked={allSelected}
                  onchange={toggleSelectAll}
                />
              </th>
            {/if}
            {#each columns as column}
              <th
                class="{column.className || ''} {column.sortable ? 'cursor-pointer select-none hover:bg-base-200 transition-colors' : ''}"
                onclick={() => handleSort(column)}
              >
                <span class="inline-flex items-center gap-1">
                  {column.label}
                  {#if column.sortable}
                    {#if currentSortBy === column.key}
                      <Icon name={currentSortDir === 'asc' ? 'chevron-up' : 'chevron-down'} size={14} />
                    {:else}
                      <span class="opacity-20"><Icon name="chevron-up" size={14} /></span>
                    {/if}
                  {/if}
                </span>
              </th>
            {/each}
            {#if actions.length > 0}
              <th class="text-right w-24">Actions</th>
            {/if}
          </tr>
        </thead>
        <tbody>
          {#each sortedItems as item}
            <tr
              class={cn('hover', onRowClick && 'cursor-pointer', rowClass?.(item))}
              onclick={(e) => handleRowClick(item, e)}
            >
              {#if selectable}
                <td>
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm"
                    checked={isSelected(item)}
                    onchange={() => toggleSelectItem(item)}
                  />
                </td>
              {/if}
              {#each columns as column}
                <td class={column.className || ''}>
                  {@html getCellValue(item, column)}
                </td>
              {/each}
              {#if actions.length > 0}
                <td class="text-right">
                  <div class="flex items-center justify-end gap-1">
                    {#each actions as action}
                      {#if !action.hidden?.(item)}
                        {#if action.href}
                          <a
                            href={action.href(item)}
                            class="btn btn-xs {action.variant ? 'btn-' + action.variant : 'btn-ghost'}"
                          >
                            {#if action.icon}<Icon name={action.icon} size={14} />{/if}
                            {action.label}
                          </a>
                        {:else if action.onClick}
                          <button
                            type="button"
                            class="btn btn-xs {action.variant ? 'btn-' + action.variant : 'btn-ghost'}"
                            onclick={() => action.onClick?.(item)}
                          >
                            {#if action.icon}<Icon name={action.icon} size={14} />{/if}
                            {action.label}
                          </button>
                        {/if}
                      {/if}
                    {/each}
                  </div>
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    {#if pageNumbers.length > 0 && onPageChange}
      <div class="flex items-center justify-between">
        <span class="text-sm text-base-content/50">
          Page {page} of {totalPages}
        </span>
        <div class="join">
          <button
            class="join-item btn btn-sm"
            disabled={page === 1}
            onclick={() => onPageChange?.((page || 1) - 1)}
          >
            &laquo;
          </button>
          {#each pageNumbers as p}
            {#if p === '...'}
              <button class="join-item btn btn-sm btn-disabled">...</button>
            {:else}
              <button
                class={cn('join-item btn btn-sm', page === p && 'btn-active')}
                onclick={() => onPageChange?.(p)}
              >
                {p}
              </button>
            {/if}
          {/each}
          <button
            class="join-item btn btn-sm"
            disabled={page === totalPages}
            onclick={() => onPageChange?.((page || 1) + 1)}
          >
            &raquo;
          </button>
        </div>
      </div>
    {/if}

    <!-- Cursor-based Load More -->
    {#if nextCursor && onLoadMore}
      <div class="text-center pt-2">
        <button type="button" class="btn btn-ghost btn-sm" onclick={onLoadMore}>
          Load More
        </button>
      </div>
    {/if}
  {/if}
</div>
