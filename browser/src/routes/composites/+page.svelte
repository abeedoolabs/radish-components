<script lang="ts">
  import { DataGrid, DataTable, Modal, ConfirmDialog, EmptyState, Icon, PageHeader, Tabs, toast, Toast, AutoForm, ChatPanel, JsonLd, productLd } from '@abeedoo/radish-components';
  import Demo from '$lib/components/Demo.svelte';
  import { dataGridProps, dataTableProps, modalProps, confirmDialogProps, emptyStateProps, iconProps, pageHeaderProps, tabsProps, autoFormProps, chatPanelProps } from '$lib/props';

  let modalOpen = $state(false);
  let confirmOpen = $state(false);

  const sampleData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'pending' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com', role: 'Editor', status: 'inactive' },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      renderHtml: (item: any) => {
        const colors: Record<string, string> = { active: 'badge-success', pending: 'badge-warning', inactive: 'badge-ghost' };
        return `<span class="badge badge-sm ${colors[item.status] || ''}">${item.status}</span>`;
      }
    }
  ];

  const actions = [
    { label: 'Edit', icon: 'edit', onClick: (item: any) => toast.info(`Edit ${item.name}`) },
    { label: 'Delete', icon: 'trash', variant: 'error', onClick: (item: any) => toast.error(`Delete ${item.name}`) },
  ];

  const pageHeaderCode = `import { PageHeader, Icon } from '@abeedoo/radish-components';

<PageHeader
  title="User Management"
  subtitle="Manage your team members"
  breadcrumbs={[{ label: 'Admin', href: '#' }, { label: 'Users' }]}
>
  {#snippet actions()}
    <button class="btn btn-primary btn-sm">
      <Icon name="plus" size={16} /> Add User
    </button>
  {/snippet}
</PageHeader>`;

  // DataGrid demo data
  const gridColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', editable: true, editType: 'select' as const, editOptions: [
      { value: 'Admin', label: 'Admin' }, { value: 'Editor', label: 'Editor' }, { value: 'Viewer', label: 'Viewer' }
    ]},
    {
      key: 'status', label: 'Status', sortable: true,
      render: (value: string) => {
        const colors: Record<string, string> = { active: 'badge-success', pending: 'badge-warning', inactive: 'badge-ghost' };
        return `<span class="badge badge-sm ${colors[value] || ''}">${value}</span>`;
      }
    }
  ];

  const gridFilters = [
    { key: 'role', label: 'Role', type: 'select' as const, options: [
      { value: 'Admin', label: 'Admin' }, { value: 'Editor', label: 'Editor' }, { value: 'Viewer', label: 'Viewer' }
    ]},
    { key: 'status', label: 'Active', type: 'boolean' as const }
  ];

  const gridBulkActions = [
    { label: 'Enable', icon: 'check', action: (ids: string[]) => toast.success(`Enabled ${ids.length} items`) },
    { label: 'Delete', icon: 'trash', variant: 'danger' as const, confirm: 'Delete selected?', action: (ids: string[]) => toast.error(`Deleted ${ids.length} items`) }
  ];

  const dataGridCode = `import { DataGrid } from '@abeedoo/radish-components';

<DataGrid
  items={data}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', editable: true, editType: 'select', editOptions: [...] },
  ]}
  filters={[
    { key: 'role', label: 'Role', type: 'select', options: [...] },
  ]}
  bulkActions={[
    { label: 'Delete', icon: 'trash', variant: 'danger', action: (ids) => delete(ids) },
  ]}
  entityName="products"
  onSearch={(q) => search(q)}
  onSort={(key, dir) => sort(key, dir)}
  onPageChange={(p) => loadPage(p)}
  onFilterChange={(f) => filter(f)}
  onCellEdit={(id, key, val) => update(id, key, val)}
/>`;

  const dataTableCode = `import { DataTable } from '@abeedoo/radish-components';

<DataTable
  items={data}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ]}
  actions={[
    { label: 'Edit', icon: 'edit', onClick: (item) => edit(item) },
  ]}
  searchable
  onSearch={(term) => search(term)}
/>`;

  const modalCode = `import { Modal } from '@abeedoo/radish-components';

let open = $state(false);

<button class="btn btn-primary" onclick={() => open = true}>Open</button>
<Modal bind:open={open} title="Edit Profile" size="md">
  <p>Modal content here.</p>
  {#snippet footer()}
    <button class="btn btn-ghost" onclick={() => open = false}>Cancel</button>
    <button class="btn btn-primary" onclick={() => open = false}>Save</button>
  {/snippet}
</Modal>`;

  const confirmDialogCode = `import { ConfirmDialog } from '@abeedoo/radish-components';

let open = $state(false);

<button class="btn btn-error" onclick={() => open = true}>Delete</button>
<ConfirmDialog
  bind:open={open}
  title="Delete Item"
  message="Are you sure? This cannot be undone."
  onConfirm={() => { open = false; deleteItem(); }}
  onCancel={() => open = false}
/>`;

  const emptyStateCode = `import { EmptyState } from '@abeedoo/radish-components';

<EmptyState
  icon="database"
  title="No records found"
  message="Try adjusting your search."
>
  {#snippet actions()}
    <button class="btn btn-primary btn-sm">Create New</button>
  {/snippet}
</EmptyState>`;

  const tabsCode = `import { Tabs } from '@abeedoo/radish-components';

<Tabs
  tabs={[
    { key: 'overview', label: 'Overview' },
    { key: 'details', label: 'Details' },
    { key: 'settings', label: 'Settings', disabled: true }
  ]}
/>`;

  const iconCode = `import { Icon } from '@abeedoo/radish-components';

<Icon name="home" size={20} />
<Icon name="users" size={20} />
<Icon name="settings" size={24} />`;

  const autoFormFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'select', options: [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
      { value: 'viewer', label: 'Viewer' }
    ]},
    { name: 'bio', label: 'Bio', type: 'textarea' },
    { name: 'active', label: 'Active', type: 'checkbox' }
  ];

  let autoFormValues = $state({ name: '', email: '', role: 'user', bio: '', active: true });

  const autoFormCode = `import { AutoForm } from '@abeedoo/radish-components';

<AutoForm
  fields={[
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'select', options: [...] },
    { name: 'bio', label: 'Bio', type: 'textarea' },
    { name: 'active', label: 'Active', type: 'checkbox' },
  ]}
  bind:values={formValues}
  columns={2}
  onsubmit={(v) => console.log(v)}
/>`;

  let chatMessages: { id: string; sender: string; text: string; time: string; position: 'start' | 'end'; variant?: string }[] = $state([
    { id: '1', sender: 'Alice', text: 'Hey there! How is the project going?', time: '10:30', position: 'start' },
    { id: '2', sender: 'You', text: 'Going well! Just finishing up the components.', time: '10:32', position: 'end', variant: 'primary' },
    { id: '3', sender: 'Alice', text: 'That sounds great, let me know if you need help.', time: '10:33', position: 'start' },
  ]);

  let chatIdCounter = $state(4);

  const jsonLdCode = `import { JsonLd, productLd, breadcrumbLd } from '@abeedoo/radish-components';

<!-- Component (recommended) -->
<JsonLd data={productLd({ name: 'Coffee', price: 24.99, brand: 'FairTrade' })} />
<JsonLd data={breadcrumbLd([
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' }
])} />

<!-- Also available: articleLd, courseLd, organizationLd, faqLd, entityLd -->`;

  const chatPanelCode = `import { ChatPanel } from '@abeedoo/radish-components';

let messages = $state([
  { id: '1', sender: 'Alice', text: 'Hello!', position: 'start' },
  { id: '2', sender: 'You', text: 'Hi!', position: 'end', variant: 'primary' },
]);

<ChatPanel
  {messages}
  title="Team Chat"
  onSend={(text) => messages.push({ ... })}
/>`;
</script>

<Toast />

<h1 class="text-3xl font-bold mb-6">Composites</h1>

<Demo title="PageHeader" description="Title, subtitle, breadcrumbs, action buttons" code={pageHeaderCode} props={pageHeaderProps}>
  <PageHeader
    title="User Management"
    subtitle="Manage your team members and their roles"
    breadcrumbs={[{ label: 'Admin', href: '#' }, { label: 'Users' }]}
  >
    {#snippet actions()}
      <button class="btn btn-primary btn-sm">
        <Icon name="plus" size={16} /> Add User
      </button>
    {/snippet}
  </PageHeader>
</Demo>

<Demo title="DataGrid" description="Feature-rich grid with filters, bulk actions, inline editing, saved views, and CSV export" code={dataGridCode} props={dataGridProps}>
  <DataGrid
    items={sampleData}
    columns={gridColumns}
    filters={gridFilters}
    bulkActions={gridBulkActions}
    pagination={{ page: 1, totalCount: sampleData.length, totalPages: 1 }}
    title="Users"
    entityName="user"
    onSearch={(q) => toast.info(`Search: ${q}`)}
    onSort={(key, dir) => toast.info(`Sort: ${key} ${dir}`)}
    onFilterChange={(f) => toast.info(`Filter: ${JSON.stringify(f)}`)}
    onCellEdit={(id, key, val) => toast.success(`Edit: ${key} = ${val}`)}
    onRowClick={(item) => toast.info(`Clicked: ${item.name}`)}
  >
    {#snippet headerActions()}
      <button class="btn btn-primary btn-sm">
        <Icon name="plus" size={14} /> Add
      </button>
    {/snippet}
  </DataGrid>
</Demo>

<Demo title="DataTable" description="Sortable, searchable table with actions and pagination" code={dataTableCode} props={dataTableProps}>
  <DataTable
    items={sampleData}
    {columns}
    {actions}
    searchable
    title="Users"
    totalCount={sampleData.length}
    onSearch={(term) => toast.info(`Search: ${term}`)}
  >
    {#snippet headerActions()}
      <button class="btn btn-primary btn-sm">
        <Icon name="plus" size={14} /> Add
      </button>
    {/snippet}
  </DataTable>
</Demo>

<Demo title="Modal" description="Dialog with title, content, footer" code={modalCode} props={modalProps}>
  <button class="btn btn-primary btn-sm" onclick={() => modalOpen = true}>Open Modal</button>
  <Modal bind:open={modalOpen} title="Edit Profile" size="md">
    <p class="py-2">Modal content goes here. Any Svelte components or HTML.</p>
    {#snippet footer()}
      <button class="btn btn-ghost" onclick={() => modalOpen = false}>Cancel</button>
      <button class="btn btn-primary" onclick={() => { modalOpen = false; toast.success('Saved!'); }}>Save</button>
    {/snippet}
  </Modal>
</Demo>

<Demo title="ConfirmDialog" description="Delete confirmation wrapper" code={confirmDialogCode} props={confirmDialogProps}>
  <button class="btn btn-error btn-sm" onclick={() => confirmOpen = true}>Delete Item</button>
  <ConfirmDialog
    bind:open={confirmOpen}
    title="Delete Item"
    message="Are you sure you want to delete this item? This cannot be undone."
    onConfirm={() => { confirmOpen = false; toast.success('Item deleted'); }}
    onCancel={() => confirmOpen = false}
  />
</Demo>

<Demo title="EmptyState" description="No results / empty content placeholder" code={emptyStateCode} props={emptyStateProps}>
  <EmptyState
    icon="database"
    title="No records found"
    message="Try adjusting your search or filter criteria."
  >
    {#snippet actions()}
      <button class="btn btn-primary btn-sm">Create New</button>
    {/snippet}
  </EmptyState>
</Demo>

<Demo title="Tabs" description="Tabbed content panels" code={tabsCode} props={tabsProps}>
  <Tabs
    tabs={[
      { key: 'overview', label: 'Overview' },
      { key: 'details', label: 'Details' },
      { key: 'settings', label: 'Settings', disabled: true }
    ]}
  />
</Demo>

<Demo title="Icon" description="Built-in feather-style SVG icons" code={iconCode} props={iconProps}>
  <div class="flex flex-wrap gap-4">
    {#each ['home', 'users', 'settings', 'search', 'edit', 'trash', 'plus', 'check', 'x', 'eye', 'lock', 'key', 'database', 'activity', 'mail', 'bell', 'heart', 'star', 'globe', 'zap', 'filter', 'download', 'upload'] as name}
      <div class="flex flex-col items-center gap-1 w-16">
        <Icon {name} size={20} />
        <span class="text-xs text-base-content/50">{name}</span>
      </div>
    {/each}
  </div>
</Demo>

<Demo title="AutoForm" description="Auto-generated form from field definitions" code={autoFormCode} props={autoFormProps}>
  <AutoForm
    fields={autoFormFields}
    bind:values={autoFormValues}
    columns={2}
    onsubmit={(v) => toast.success('Submitted: ' + JSON.stringify(v))}
    oncancel={() => toast.info('Cancelled')}
  />
</Demo>

<Demo title="JsonLd" description="Schema.org structured data for SEO rich results" code={jsonLdCode} props={[]}>
  <JsonLd data={productLd({ name: 'Organic Coffee', price: 24.99, brand: 'FairTrade', sku: 'COF-001' })} />
  <div class="mockup-code text-sm">
    <pre><code>{JSON.stringify(productLd({ name: 'Organic Coffee', price: 24.99, brand: 'FairTrade', sku: 'COF-001' }), null, 2)}</code></pre>
  </div>
</Demo>

<Demo title="ChatPanel" description="Complete chat interface with message list and input" code={chatPanelCode} props={chatPanelProps}>
  <div class="h-96">
    <ChatPanel
      messages={chatMessages}
      title="Team Chat"
      onSend={(text) => {
        chatMessages = [...chatMessages, {
          id: String(chatIdCounter),
          sender: 'You',
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          position: 'end',
          variant: 'primary'
        }];
        chatIdCounter++;
      }}
    />
  </div>
</Demo>
