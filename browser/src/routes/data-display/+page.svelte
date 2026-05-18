<script lang="ts">
  import { Badge, Avatar, AvatarGroup, Stat, StatGroup, Kbd, Status, Collapse, Accordion, AccordionItem, Table, Countdown, Icon, CodeBlock, ChatBubble, Timeline, TimelineItem } from '@abeedoo/radish-components';
  import Demo from '$lib/components/Demo.svelte';
  import { badgeProps, avatarProps, statProps, collapseProps, accordionItemProps, tableProps, codeBlockProps, chatBubbleProps } from '$lib/props';

  let countdown = $state(42);

  const timelineCode = `import { Timeline, TimelineItem } from '@abeedoo/radish-components';

<Timeline>
  <TimelineItem variant="primary">
    {#snippet start()}2024{/snippet}
    {#snippet end()}Project started{/snippet}
  </TimelineItem>
  <TimelineItem variant="success">
    {#snippet start()}2025{/snippet}
    {#snippet end()}Beta release{/snippet}
  </TimelineItem>
</Timeline>`;

  const badgeCode = `import { Badge } from '@abeedoo/radish-components';

<Badge text="Primary" variant="primary" />
<Badge text="Success" variant="success" />
<Badge text="Active" variant="auto" />
<Badge text="Pending" variant="auto" />`;

  const avatarCode = `import { Avatar, AvatarGroup } from '@abeedoo/radish-components';

<Avatar placeholder="JD" size="lg" />
<Avatar placeholder="ON" online={true} />

<AvatarGroup>
  <Avatar placeholder="A" size="sm" />
  <Avatar placeholder="B" size="sm" />
</AvatarGroup>`;

  const statCode = `import { Stat, StatGroup } from '@abeedoo/radish-components';

<StatGroup>
  <Stat title="Total Users" value="31K" description="21% more" />
  <Stat title="Revenue" value="$12,400" />
</StatGroup>`;

  const collapseCode = `import { Collapse } from '@abeedoo/radish-components';

<Collapse title="Click to expand">
  <p>Collapsible content here.</p>
</Collapse>`;

  const accordionCode = `import { Accordion, AccordionItem } from '@abeedoo/radish-components';

<Accordion>
  <AccordionItem title="Section 1" name="faq" checked>
    <p>Content for section 1.</p>
  </AccordionItem>
  <AccordionItem title="Section 2" name="faq">
    <p>Content for section 2.</p>
  </AccordionItem>
</Accordion>`;

  const tableCode = `import { Table } from '@abeedoo/radish-components';

<Table zebra>
  <thead>
    <tr><th>Name</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>Admin</td></tr>
  </tbody>
</Table>`;

  const countdownCode = `import { Countdown } from '@abeedoo/radish-components';

<Countdown value={42} />`;

  const kbdCode = `import { Kbd } from '@abeedoo/radish-components';

<Kbd key="Ctrl" />
<Kbd key="+" />
<Kbd key="C" />`;

  const statusCode = `import { Status } from '@abeedoo/radish-components';

<Status variant="success" />
<Status variant="warning" />
<Status variant="error" />`;

  const codeBlockCode = `import { CodeBlock } from '@abeedoo/radish-components';

<CodeBlock
  code="const x = 1;\\nconst y = 2;"
  language="typescript"
  title="Example"
  showLineNumbers
/>`;

  const chatBubbleCode = `import { ChatBubble } from '@abeedoo/radish-components';

<ChatBubble position="start" sender="Alice">
  Hey, how are you?
</ChatBubble>
<ChatBubble position="end" sender="Bob" variant="primary">
  I'm doing great, thanks!
</ChatBubble>`;
</script>

<h1 class="text-3xl font-bold mb-6">Data Display</h1>

<Demo title="Badge" description="Variants, sizes, outline, auto-preset" code={badgeCode} props={badgeProps}>
  <div class="flex flex-wrap gap-2 mb-3">
    <Badge text="Primary" variant="primary" />
    <Badge text="Secondary" variant="secondary" />
    <Badge text="Success" variant="success" />
    <Badge text="Warning" variant="warning" />
    <Badge text="Error" variant="error" />
    <Badge text="Info" variant="info" />
    <Badge text="Ghost" variant="ghost" />
    <Badge text="Neutral" variant="neutral" />
  </div>
  <div class="flex flex-wrap gap-2">
    <Badge text="Active" variant="auto" />
    <Badge text="Pending" variant="auto" />
    <Badge text="Rejected" variant="auto" />
    <Badge text="Draft" variant="auto" />
    <Badge text="Published" variant="auto" />
  </div>
</Demo>

<Demo title="Avatar" description="Image, placeholder, sizes, online status" code={avatarCode} props={avatarProps}>
  <div class="flex items-center gap-4 mb-4">
    <Avatar placeholder="JD" size="xs" />
    <Avatar placeholder="JD" size="sm" />
    <Avatar placeholder="JD" />
    <Avatar placeholder="JD" size="lg" />
  </div>
  <div class="flex items-center gap-4">
    <Avatar placeholder="ON" online={true} />
    <Avatar placeholder="OFF" online={false} />
  </div>
</Demo>

<Demo title="Avatar Group" description="Overlapping avatars" code={avatarCode}>
  <AvatarGroup>
    <Avatar placeholder="A" size="sm" />
    <Avatar placeholder="B" size="sm" />
    <Avatar placeholder="C" size="sm" />
    <Avatar placeholder="+3" size="sm" />
  </AvatarGroup>
</Demo>

<Demo title="Stat" description="Stats with StatGroup" code={statCode} props={statProps}>
  <StatGroup>
    <Stat title="Total Users" value="31K" description="21% more than last month" />
    <Stat title="Page Views" value="2.6M" description="14% more" />
    <Stat title="Revenue" value="$12,400" description="Since Jan 1st" />
  </StatGroup>
</Demo>

<Demo title="Kbd" description="Keyboard keys" code={kbdCode}>
  <div class="flex gap-1">
    <Kbd key="Ctrl" />
    <Kbd key="+" />
    <Kbd key="C" />
  </div>
</Demo>

<Demo title="Status" description="Status indicators" code={statusCode}>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-2"><Status variant="success" /> Online</div>
    <div class="flex items-center gap-2"><Status variant="warning" /> Away</div>
    <div class="flex items-center gap-2"><Status variant="error" /> Offline</div>
  </div>
</Demo>

<Demo title="Collapse" description="Collapsible content" code={collapseCode} props={collapseProps}>
  <Collapse title="Click to expand">
    <p>This is the collapsible content. It can contain any HTML.</p>
  </Collapse>
</Demo>

<Demo title="Accordion" description="Multiple collapsible items, exclusive mode" code={accordionCode} props={accordionItemProps}>
  <Accordion>
    <AccordionItem title="Section 1" name="faq" checked>
      <p>Content for section 1.</p>
    </AccordionItem>
    <AccordionItem title="Section 2" name="faq">
      <p>Content for section 2.</p>
    </AccordionItem>
    <AccordionItem title="Section 3" name="faq">
      <p>Content for section 3.</p>
    </AccordionItem>
  </Accordion>
</Demo>

<Demo title="Table" description="Simple table wrapper with zebra striping" code={tableCode} props={tableProps}>
  <Table zebra>
    <thead>
      <tr><th>Name</th><th>Role</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr><td>Alice</td><td>Admin</td><td><Badge text="Active" variant="success" /></td></tr>
      <tr><td>Bob</td><td>Editor</td><td><Badge text="Pending" variant="warning" /></td></tr>
      <tr><td>Charlie</td><td>Viewer</td><td><Badge text="Inactive" variant="ghost" /></td></tr>
    </tbody>
  </Table>
</Demo>

<Demo title="Countdown" description="Animated countdown digit" code={countdownCode}>
  <div class="flex items-center gap-4">
    <Countdown value={countdown} />
    <input type="range" min="0" max="99" bind:value={countdown} class="range range-sm w-32" />
  </div>
</Demo>

<Demo title="CodeBlock" description="Syntax-highlighted code display with copy button" code={codeBlockCode} props={codeBlockProps}>
  <CodeBlock
    code={"const x = 1;\nconst y = 2;\nconsole.log(x + y);"}
    language="typescript"
    title="Example"
    showLineNumbers
  />
</Demo>

<Demo title="ChatBubble" description="Chat message bubbles with sender, position, variants" code={chatBubbleCode} props={chatBubbleProps}>
  <div class="space-y-2">
    <ChatBubble position="start" sender="Alice" time="12:45">
      Hey, how are you?
    </ChatBubble>
    <ChatBubble position="end" sender="Bob" variant="primary" time="12:46">
      I'm doing great, thanks!
    </ChatBubble>
  </div>
</Demo>

<Demo title="Timeline" description="Vertical timeline with items" code={timelineCode}>
  <Timeline>
    <TimelineItem variant="primary">
      {#snippet start()}<span class="font-mono text-sm">2024</span>{/snippet}
      {#snippet end()}<div><div class="font-semibold">Project Started</div><div class="text-sm text-base-content/60">Initial planning and setup</div></div>{/snippet}
    </TimelineItem>
    <TimelineItem variant="primary">
      {#snippet start()}<span class="font-mono text-sm">2025</span>{/snippet}
      {#snippet end()}<div><div class="font-semibold">Beta Release</div><div class="text-sm text-base-content/60">First public beta</div></div>{/snippet}
    </TimelineItem>
    <TimelineItem variant="success">
      {#snippet start()}<span class="font-mono text-sm">2026</span>{/snippet}
      {#snippet end()}<div><div class="font-semibold">v1.0 Launch</div><div class="text-sm text-base-content/60">Stable release</div></div>{/snippet}
    </TimelineItem>
  </Timeline>
</Demo>
