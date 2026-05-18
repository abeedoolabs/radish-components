<script lang="ts">
  import { TextInput, Textarea, Select, Checkbox, Toggle, Radio, Range, Rating, FileInput, FormField, Calendar, DateRangeInput, DropZone, SearchInput, toast, Toast } from '@abeedoo/radish-components';
  import Demo from '$lib/components/Demo.svelte';
  import { textInputProps, selectProps, checkboxProps, toggleProps, radioProps, rangeProps, ratingProps, formFieldProps, calendarProps, dateRangeProps, dropZoneProps, searchInputProps } from '$lib/props';

  let text = $state('Hello world');
  let area = $state('');
  let selected = $state('svelte');
  let checked = $state(false);
  let toggled = $state(true);
  let radioGroup = $state('option1');
  let rangeVal = $state(50);
  let rating = $state(3);

  const textInputCode = `import { TextInput } from '@abeedoo/radish-components';

let text = $state('');

<TextInput bind:value={text} placeholder="Type here..." />
<TextInput value={text} variant="primary" />
<TextInput placeholder="Ghost" ghost bordered={false} />`;

  const textareaCode = `import { Textarea } from '@abeedoo/radish-components';

let area = $state('');

<Textarea bind:value={area} placeholder="Write something..." rows={4} />`;

  const selectCode = `import { Select } from '@abeedoo/radish-components';

let selected = $state('svelte');

<Select bind:value={selected} placeholder="Pick a framework" options={[
  { value: 'svelte', label: 'Svelte' },
  { value: 'react', label: 'React' },
]} />`;

  const checkboxCode = `import { Checkbox } from '@abeedoo/radish-components';

let checked = $state(false);

<Checkbox bind:checked label="Accept terms" variant="primary" />
<Checkbox checked={true} label="Already checked" variant="success" />`;

  const toggleCode = `import { Toggle } from '@abeedoo/radish-components';

let toggled = $state(true);

<Toggle bind:checked={toggled} label="Enable notifications" variant="primary" />
<Toggle checked={true} label="Dark mode" variant="secondary" />`;

  const radioCode = `import { Radio } from '@abeedoo/radish-components';

let radioGroup = $state('option1');

<Radio name="demo" value="option1" bind:group={radioGroup} label="Option 1" />
<Radio name="demo" value="option2" bind:group={radioGroup} label="Option 2" />`;

  const rangeCode = `import { Range } from '@abeedoo/radish-components';

let rangeVal = $state(50);

<Range bind:value={rangeVal} min={0} max={100} variant="primary" />`;

  const ratingCode = `import { Rating } from '@abeedoo/radish-components';

let rating = $state(3);

<Rating bind:value={rating} />
<Rating value={4} max={5} half />`;

  const fileInputCode = `import { FileInput } from '@abeedoo/radish-components';

<FileInput bordered variant="primary" />`;

  const formFieldCode = `import { FormField } from '@abeedoo/radish-components';

<FormField name="email" label="Email" type="email" required />
<FormField name="password" label="Password" type="password" error="Too short" />
<FormField name="role" label="Role" type="select" options={[
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
]} />`;

  let selectedDate = $state('');
  let startDate = $state('');
  let endDate = $state('');
  let searchVal = $state('');

  const calendarCode = `import { Calendar } from '@abeedoo/radish-components';

let selectedDate = $state('');

<Calendar bind:value={selectedDate} />
<p>Selected: {selectedDate}</p>`;

  const dateRangeCode = `import { DateRangeInput } from '@abeedoo/radish-components';

let startDate = $state('');
let endDate = $state('');

<DateRangeInput bind:startDate bind:endDate />`;

  const dropZoneCode = `import { DropZone } from '@abeedoo/radish-components';

<DropZone
  accept="image/*"
  multiple
  maxSize={5242880}
  onDrop={(files) => toast.info(files.length + ' files')}
/>`;

  const searchInputCode = `import { SearchInput } from '@abeedoo/radish-components';

let searchVal = $state('');

<SearchInput bind:value={searchVal} onSearch={(t) => console.log(t)} />`;
</script>

<h1 class="text-3xl font-bold mb-6">Data Input</h1>

<Demo title="TextInput" description="Variants, sizes, bordered, bindable value" code={textInputCode} props={textInputProps}>
  <div class="space-y-3 max-w-sm">
    <TextInput bind:value={text} placeholder="Type here..." />
    <TextInput value={text} variant="primary" />
    <TextInput placeholder="Small" size="sm" />
    <TextInput placeholder="Ghost" ghost bordered={false} />
    <p class="text-sm text-base-content/60">Value: {text}</p>
  </div>
</Demo>

<Demo title="Textarea" description="Bordered, sizes, bindable" code={textareaCode} props={textInputProps}>
  <div class="max-w-sm">
    <Textarea bind:value={area} placeholder="Write something..." rows={4} />
  </div>
</Demo>

<Demo title="Select" description="Options, placeholder, variants" code={selectCode} props={selectProps}>
  <div class="max-w-sm">
    <Select
      bind:value={selected}
      placeholder="Pick a framework"
      options={[
        { value: 'svelte', label: 'Svelte' },
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' }
      ]}
    />
    <p class="text-sm text-base-content/60 mt-2">Selected: {selected}</p>
  </div>
</Demo>

<Demo title="Checkbox" description="With label, variants, sizes" code={checkboxCode} props={checkboxProps}>
  <div class="space-y-2">
    <Checkbox bind:checked label="Accept terms" variant="primary" />
    <Checkbox checked={true} label="Already checked" variant="success" />
    <p class="text-sm text-base-content/60">Checked: {checked}</p>
  </div>
</Demo>

<Demo title="Toggle" description="Switch toggle with label" code={toggleCode} props={toggleProps}>
  <div class="space-y-2">
    <Toggle bind:checked={toggled} label="Enable notifications" variant="primary" />
    <Toggle checked={true} label="Dark mode" variant="secondary" />
    <p class="text-sm text-base-content/60">Toggled: {toggled}</p>
  </div>
</Demo>

<Demo title="Radio" description="Radio buttons with group binding" code={radioCode} props={radioProps}>
  <div class="space-y-2">
    <Radio name="demo-radio" value="option1" bind:group={radioGroup} label="Option 1" variant="primary" />
    <Radio name="demo-radio" value="option2" bind:group={radioGroup} label="Option 2" variant="primary" />
    <Radio name="demo-radio" value="option3" bind:group={radioGroup} label="Option 3" variant="primary" />
    <p class="text-sm text-base-content/60">Selected: {radioGroup}</p>
  </div>
</Demo>

<Demo title="Range" description="Slider with min/max/step" code={rangeCode} props={rangeProps}>
  <div class="max-w-sm space-y-2">
    <Range bind:value={rangeVal} min={0} max={100} variant="primary" />
    <p class="text-sm text-base-content/60">Value: {rangeVal}</p>
  </div>
</Demo>

<Demo title="Rating" description="Star rating with half-star support" code={ratingCode} props={ratingProps}>
  <div class="space-y-3">
    <Rating bind:value={rating} name="rating-demo" />
    <Rating value={4} max={5} half name="rating-half-demo" />
    <p class="text-sm text-base-content/60">Rating: {rating}</p>
  </div>
</Demo>

<Demo title="FileInput" description="Styled file picker" code={fileInputCode}>
  <div class="max-w-sm">
    <FileInput bordered variant="primary" />
  </div>
</Demo>

<Demo title="FormField" description="Complete form field with label, validation, help text" code={formFieldCode} props={formFieldProps}>
  <div class="max-w-sm space-y-3">
    <FormField name="email" label="Email" type="email" placeholder="you@example.com" required />
    <FormField name="password" label="Password" type="password" error="Password is too short" />
    <FormField name="role" label="Role" type="select" options={[
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' }
    ]} helpText="Select the user's role" />
    <FormField name="bio" label="Bio" type="textarea" placeholder="Tell us about yourself..." />
    <FormField name="active" label="Active" type="checkbox" value={true} />
  </div>
</Demo>

<Toast />

<Demo title="Calendar" description="Date picker calendar" code={calendarCode} props={calendarProps}>
  <div class="max-w-sm space-y-2">
    <Calendar bind:value={selectedDate} />
    <p class="text-sm text-base-content/60">Selected: {selectedDate || 'none'}</p>
  </div>
</Demo>

<Demo title="DateRangeInput" description="Start and end date inputs" code={dateRangeCode} props={dateRangeProps}>
  <div class="max-w-sm space-y-2">
    <DateRangeInput bind:startDate bind:endDate />
    <p class="text-sm text-base-content/60">Range: {startDate || '...'} to {endDate || '...'}</p>
  </div>
</Demo>

<Demo title="DropZone" description="Drag-and-drop file upload area" code={dropZoneCode} props={dropZoneProps}>
  <div class="max-w-md">
    <DropZone accept="image/*" multiple maxSize={5242880} onDrop={(files) => toast.info(files.length + ' file(s) dropped')} />
  </div>
</Demo>

<Demo title="SearchInput" description="Debounced search input with loading state" code={searchInputCode} props={searchInputProps}>
  <div class="max-w-sm space-y-2">
    <SearchInput bind:value={searchVal} onSearch={(t) => console.log('Search:', t)} />
    <p class="text-sm text-base-content/60">Value: {searchVal}</p>
  </div>
</Demo>
