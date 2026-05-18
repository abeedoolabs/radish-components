<script lang="ts">
  import { Breadcrumbs, Menu, MenuItem, MenuTitle, Navbar, Pagination, Steps, Step, Link, Dock, DockItem, Icon } from '@abeedoo/radish-components';
  import Demo from '$lib/components/Demo.svelte';
  import { paginationProps, menuProps, navbarProps } from '$lib/props';

  let currentPage = $state(3);

  const breadcrumbsCode = `import { Breadcrumbs } from '@abeedoo/radish-components';

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '#' },
  { label: 'Widget' }
]} />`;

  const menuCode = `import { Menu, MenuItem, MenuTitle, Icon } from '@abeedoo/radish-components';

<Menu class="bg-base-200 w-56 rounded-box">
  <MenuTitle title="Category" />
  <MenuItem href="#" active>
    <Icon name="home" size={16} /> Dashboard
  </MenuItem>
  <MenuItem href="#">
    <Icon name="users" size={16} /> Users
  </MenuItem>
</Menu>

<Menu horizontal class="bg-base-200 rounded-box">
  <MenuItem href="#">Home</MenuItem>
  <MenuItem href="#" active>About</MenuItem>
</Menu>`;

  const navbarCode = `import { Navbar } from '@abeedoo/radish-components';

<Navbar class="bg-base-200 rounded-box">
  {#snippet start()}
    <a class="btn btn-ghost text-xl" href="#">Brand</a>
  {/snippet}
  {#snippet center()}
    <a class="btn btn-ghost btn-sm" href="#">Home</a>
  {/snippet}
  {#snippet end()}
    <button class="btn btn-primary btn-sm">Login</button>
  {/snippet}
</Navbar>`;

  const paginationCode = `import { Pagination } from '@abeedoo/radish-components';

let currentPage = $state(3);

<Pagination bind:page={currentPage} totalPages={10} />
<Pagination bind:page={currentPage} totalPages={10} size="sm" />`;

  const stepsCode = `import { Steps, Step } from '@abeedoo/radish-components';

<Steps>
  <Step variant="primary">Register</Step>
  <Step variant="primary">Choose Plan</Step>
  <Step>Payment</Step>
  <Step>Complete</Step>
</Steps>`;

  const linkCode = `import { Link } from '@abeedoo/radish-components';

<Link href="#">Default</Link>
<Link href="#" variant="primary">Primary</Link>
<Link href="#" variant="secondary">Secondary</Link>`;

  const dockCode = `import { Dock, DockItem, Icon } from '@abeedoo/radish-components';

<Dock>
  <DockItem label="Home" active>
    <Icon name="home" size={20} />
  </DockItem>
  <DockItem label="Search">
    <Icon name="search" size={20} />
  </DockItem>
</Dock>`;
</script>

<h1 class="text-3xl font-bold mb-6">Navigation</h1>

<Demo title="Breadcrumbs" description="Navigation trail" code={breadcrumbsCode}>
  <Breadcrumbs items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '#' },
    { label: 'Widget' }
  ]} />
</Demo>

<Demo title="Menu" description="Vertical and horizontal menus with titles" code={menuCode} props={menuProps}>
  <div class="flex gap-8">
    <Menu class="bg-base-200 w-56 rounded-box">
      <MenuTitle title="Category" />
      <MenuItem href="#" active>
        <Icon name="home" size={16} /> Dashboard
      </MenuItem>
      <MenuItem href="#">
        <Icon name="users" size={16} /> Users
      </MenuItem>
      <MenuItem disabled>
        <Icon name="settings" size={16} /> Settings
      </MenuItem>
    </Menu>

    <Menu horizontal class="bg-base-200 rounded-box">
      <MenuItem href="#">Home</MenuItem>
      <MenuItem href="#" active>About</MenuItem>
      <MenuItem href="#">Contact</MenuItem>
    </Menu>
  </div>
</Demo>

<Demo title="Navbar" description="Top navigation bar with start/center/end" code={navbarCode} props={navbarProps}>
  <Navbar class="bg-base-200 rounded-box">
    {#snippet start()}
      <a class="btn btn-ghost text-xl" href="#">Brand</a>
    {/snippet}
    {#snippet center()}
      <div class="flex gap-2">
        <a class="btn btn-ghost btn-sm" href="#">Home</a>
        <a class="btn btn-ghost btn-sm" href="#">About</a>
      </div>
    {/snippet}
    {#snippet end()}
      <button class="btn btn-primary btn-sm">Login</button>
    {/snippet}
  </Navbar>
</Demo>

<Demo title="Pagination" description="Page-based navigation with bind:page" code={paginationCode} props={paginationProps}>
  <div class="space-y-3">
    <Pagination bind:page={currentPage} totalPages={10} />
    <Pagination bind:page={currentPage} totalPages={10} size="sm" />
    <p class="text-sm text-base-content/60">Current page: {currentPage}</p>
  </div>
</Demo>

<Demo title="Steps" description="Progress steps with variants" code={stepsCode}>
  <Steps>
    <Step variant="primary">Register</Step>
    <Step variant="primary">Choose Plan</Step>
    <Step>Payment</Step>
    <Step>Complete</Step>
  </Steps>
</Demo>

<Demo title="Link" description="Styled anchor links" code={linkCode}>
  <div class="flex gap-4">
    <Link href="#">Default</Link>
    <Link href="#" variant="primary">Primary</Link>
    <Link href="#" variant="secondary">Secondary</Link>
    <Link href="#" variant="accent">Accent</Link>
  </div>
</Demo>

<Demo title="Dock" description="Bottom navigation bar" code={dockCode}>
  <Dock>
    <DockItem label="Home" active>
      <Icon name="home" size={20} />
    </DockItem>
    <DockItem label="Search">
      <Icon name="search" size={20} />
    </DockItem>
    <DockItem label="Settings">
      <Icon name="settings" size={20} />
    </DockItem>
  </Dock>
</Demo>
