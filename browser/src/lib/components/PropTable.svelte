<script lang="ts">
/**
 * PropTable — renders a props reference table for a component.
 * Used by demo pages to show prop documentation.
 */
import { DataTable } from '@abeedoo/radish-components';

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

let {
  props = [] as PropDef[]
}: {
  props: PropDef[];
} = $props();

const columns = [
  { key: 'name', label: 'Prop', sortable: true, renderHtml: (item: PropDef) => `<code class="text-primary text-sm">${item.name}</code>` },
  { key: 'type', label: 'Type', renderHtml: (item: PropDef) => `<code class="text-sm text-base-content/70">${item.type}</code>` },
  { key: 'default', label: 'Default', renderHtml: (item: PropDef) => item.default ? `<code class="text-sm text-base-content/50">${item.default}</code>` : `<span class="text-base-content/30">\u2014</span>` },
  { key: 'description', label: 'Description' }
];
</script>

<DataTable items={props} {columns} emptyMessage="No props defined." />
