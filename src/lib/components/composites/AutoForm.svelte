<script lang="ts">
/**
 * AutoForm — generates a form from field definitions.
 * Consumes metadata (from Radish metadata services or manual definitions)
 * and renders the appropriate input for each field.
 */
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import Icon from './Icon.svelte';

export interface FieldDef {
  name: string;
  label?: string;
  type: string;
  required?: boolean;
  default?: any;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  values?: string[];
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  hidden?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  group?: string;
}

let {
  fields = [] as FieldDef[],
  values = $bindable({} as Record<string, any>),
  errors = {} as Record<string, string>,
  columns = 1,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
  disabled = false,
  showCancel = true,
  class: className = '',
  onsubmit,
  oncancel,
  header,
  footer
}: {
  fields: FieldDef[];
  values?: Record<string, any>;
  errors?: Record<string, string>;
  columns?: 1 | 2 | 3;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  showCancel?: boolean;
  class?: string;
  onsubmit?: (values: Record<string, any>) => void;
  oncancel?: () => void;
  header?: Snippet;
  footer?: Snippet;
} = $props();

// Initialize defaults
$effect(() => {
  for (const field of fields) {
    if (values[field.name] === undefined && field.default !== undefined) {
      values[field.name] = field.default;
    }
  }
});

// Map field types to input types
function getInputType(fieldType: string): string {
  const map: Record<string, string> = {
    string: 'text',
    text: 'text',
    email: 'email',
    password: 'password',
    url: 'url',
    tel: 'tel',
    int: 'number',
    float: 'number',
    number: 'number',
    date: 'date',
    isoDate: 'datetime-local',
    'datetime-local': 'datetime-local',
    boolean: 'checkbox',
    bool: 'checkbox',
    enum: 'select',
    select: 'select',
    textarea: 'textarea',
    objectId: 'text',
    any: 'textarea'
  };
  return map[fieldType] || 'text';
}

function getOptions(field: FieldDef): { value: string; label: string }[] {
  if (field.options) return field.options;
  if (field.values) return field.values.map(v => ({ value: v, label: v }));
  return [];
}

// Group fields
let visibleFields = $derived(fields.filter(f => !f.hidden));
let groups = $derived.by(() => {
  const grouped = new Map<string, FieldDef[]>();
  for (const field of visibleFields) {
    const group = field.group || '';
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group)!.push(field);
  }
  return grouped;
});

const colClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
};

function handleSubmit(e: Event) {
  e.preventDefault();
  onsubmit?.(values);
}
</script>

<form class={cn('space-y-6', className)} onsubmit={handleSubmit}>
  {#if header}
    {@render header()}
  {/if}

  {#each [...groups.entries()] as [groupName, groupFields]}
    {#if groupName}
      <div class="divider text-sm text-base-content/50">{groupName}</div>
    {/if}

    <div class={cn('grid gap-4', colClass[columns])}>
      {#each groupFields as field}
        {@const inputType = getInputType(field.type)}
        {@const error = errors[field.name]}
        {@const fieldDisabled = disabled || field.disabled || loading}

        <div class="form-control w-full">
          {#if inputType !== 'checkbox'}
            <label class="label" for={field.name}>
              <span class="label-text">
                {field.label || field.name}
                {#if field.required}<span class="text-error">*</span>{/if}
              </span>
            </label>
          {/if}

          {#if inputType === 'select'}
            <select
              id={field.name}
              name={field.name}
              class={cn('select select-bordered w-full', error && 'select-error')}
              bind:value={values[field.name]}
              required={field.required}
              disabled={fieldDisabled}
            >
              {#if field.placeholder}
                <option value="" disabled>{field.placeholder}</option>
              {/if}
              {#each getOptions(field) as opt}
                <option value={opt.value}>{opt.label}</option>
              {/each}
            </select>

          {:else if inputType === 'textarea'}
            <textarea
              id={field.name}
              name={field.name}
              class={cn('textarea textarea-bordered w-full', error && 'textarea-error')}
              bind:value={values[field.name]}
              placeholder={field.placeholder || ''}
              required={field.required}
              disabled={fieldDisabled}
              readonly={field.readonly}
              rows={field.rows || 3}
            ></textarea>

          {:else if inputType === 'checkbox'}
            <label class="label cursor-pointer justify-start gap-3">
              <input
                id={field.name}
                name={field.name}
                type="checkbox"
                class={cn('checkbox', error && 'checkbox-error')}
                bind:checked={values[field.name]}
                disabled={fieldDisabled}
              />
              <span class="label-text">
                {field.label || field.name}
                {#if field.required}<span class="text-error">*</span>{/if}
              </span>
            </label>

          {:else}
            <input
              id={field.name}
              name={field.name}
              type={inputType}
              class={cn('input input-bordered w-full', error && 'input-error')}
              bind:value={values[field.name]}
              placeholder={field.placeholder || ''}
              required={field.required}
              disabled={fieldDisabled}
              readonly={field.readonly}
              min={field.min}
              max={field.max}
              step={field.step}
            />
          {/if}

          {#if error}
            <label class="label">
              <span class="label-text-alt text-error">{error}</span>
            </label>
          {:else if field.helpText}
            <label class="label">
              <span class="label-text-alt text-base-content/50">{field.helpText}</span>
            </label>
          {/if}
        </div>
      {/each}
    </div>
  {/each}

  {#if footer}
    {@render footer()}
  {:else}
    <div class="flex justify-end gap-2 pt-4">
      {#if showCancel && oncancel}
        <button type="button" class="btn btn-ghost" onclick={oncancel} disabled={loading}>
          {cancelLabel}
        </button>
      {/if}
      <button type="submit" class="btn btn-primary" disabled={disabled || loading}>
        {#if loading}
          <span class="loading loading-spinner loading-sm"></span>
        {/if}
        {submitLabel}
      </button>
    </div>
  {/if}
</form>
