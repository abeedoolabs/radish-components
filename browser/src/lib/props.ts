/**
 * Shared prop definitions for component documentation.
 * Centralizes all prop metadata — each demo page imports what it needs.
 */
import type { PropDef } from './components/PropTable.svelte';

// Common prop fragments reused across components
const classProp: PropDef = { name: 'class', type: 'string', description: 'Additional CSS classes' };
const restProp: PropDef = { name: '...rest', type: 'any', description: 'All HTML attributes forwarded (onclick, aria-label, data-*, etc.)' };
const childrenProp: PropDef = { name: 'children', type: 'Snippet', description: 'Content' };
const variantProp: PropDef = { name: 'variant', type: 'Variant', description: 'primary, secondary, accent, success, warning, error, ghost, neutral' };
const colorVariantProp: PropDef = { name: 'variant', type: 'ColorVariant', description: 'primary, secondary, accent, info, success, warning, error' };
const sizeProp: PropDef = { name: 'size', type: 'Size', description: 'xs, sm, md, lg' };

// Actions
export const buttonProps: PropDef[] = [
  variantProp, sizeProp,
  { name: 'outline', type: 'boolean', default: 'false', description: 'Outline style' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows spinner, disables button' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'wide', type: 'boolean', default: 'false', description: 'Wider button' },
  { name: 'block', type: 'boolean', default: 'false', description: 'Full width' },
  { name: 'href', type: 'string', description: 'Renders as <a> instead of <button>' },
  { name: 'type', type: 'string', default: 'button', description: 'button, submit, reset' },
  classProp, restProp
];

export const dropdownProps: PropDef[] = [
  { name: 'label', type: 'string', default: 'Open', description: 'Button text (or use trigger snippet)' },
  variantProp, sizeProp,
  { name: 'mode', type: 'string', default: 'details', description: 'details or popover' },
  { name: 'position', type: 'string', default: 'bottom', description: 'top, bottom, left, right' },
  { name: 'align', type: 'string', default: 'start', description: 'start or end' },
  { name: 'hover', type: 'boolean', default: 'false', description: 'Open on hover' },
  { name: 'trigger', type: 'Snippet', description: 'Custom trigger content' },
  childrenProp
];

export const swapProps: PropDef[] = [
  { name: 'active', type: 'boolean', default: 'false', description: '$bindable — current toggle state' },
  { name: 'rotate', type: 'boolean', default: 'false', description: 'Rotate animation' },
  { name: 'flip', type: 'boolean', default: 'false', description: 'Flip animation' },
  { name: 'on', type: 'Snippet', description: 'Content shown when active' },
  { name: 'off', type: 'Snippet', description: 'Content shown when inactive' },
  classProp
];

// Data Display
export const badgeProps: PropDef[] = [
  { name: 'text', type: 'string', description: 'Badge text' },
  { name: 'variant', type: 'string', description: 'Color variant or "auto" for status presets' },
  sizeProp,
  { name: 'outline', type: 'boolean', default: 'false', description: 'Outline style' },
  classProp
];

export const avatarProps: PropDef[] = [
  { name: 'src', type: 'string', description: 'Image URL' },
  { name: 'placeholder', type: 'string', description: 'Text placeholder (e.g., initials)' },
  { name: 'size', type: 'string', default: 'md', description: 'xs, sm, md, lg' },
  { name: 'rounded', type: 'boolean', default: 'true', description: 'Circular shape' },
  { name: 'online', type: 'boolean', description: 'Online/offline indicator' },
  classProp
];

export const statProps: PropDef[] = [
  { name: 'title', type: 'string', description: 'Stat label' },
  { name: 'value', type: 'string | number', description: 'Main value' },
  { name: 'description', type: 'string', description: 'Description below value' },
  { name: 'figure', type: 'Snippet', description: 'Icon or graphic' },
  classProp
];

export const accordionItemProps: PropDef[] = [
  { name: 'title', type: 'string', description: 'Section title' },
  { name: 'name', type: 'string', description: 'Same name = exclusive (only one open)' },
  { name: 'checked', type: 'boolean', default: 'false', description: 'Initially open' },
  childrenProp, classProp
];

export const collapseProps: PropDef[] = [
  { name: 'title', type: 'string', description: 'Header text' },
  { name: 'open', type: 'boolean', default: 'false', description: 'Initially open' },
  { name: 'icon', type: 'string', default: 'arrow', description: 'arrow or plus' },
  childrenProp, classProp
];

export const tableProps: PropDef[] = [
  { name: 'zebra', type: 'boolean', default: 'false', description: 'Zebra striping' },
  { name: 'pinRows', type: 'boolean', default: 'false', description: 'Sticky header' },
  { name: 'pinCols', type: 'boolean', default: 'false', description: 'Sticky first column' },
  sizeProp, childrenProp, classProp
];

export const codeBlockProps: PropDef[] = [
  { name: 'code', type: 'string', description: 'Code content' },
  { name: 'language', type: 'string', description: 'Language badge label' },
  { name: 'title', type: 'string', description: 'Title bar text' },
  { name: 'showLineNumbers', type: 'boolean', default: 'false', description: 'Show line numbers' },
  { name: 'copyable', type: 'boolean', default: 'true', description: 'Show copy button' },
  classProp
];

export const chatBubbleProps: PropDef[] = [
  { name: 'sender', type: 'string', description: 'Sender name' },
  { name: 'time', type: 'string', description: 'Timestamp' },
  colorVariantProp,
  { name: 'position', type: 'string', default: 'start', description: 'start or end' },
  { name: 'avatar', type: 'string', description: 'Avatar image URL' },
  childrenProp, classProp
];

export const carouselProps: PropDef[] = [
  { name: 'items', type: 'any[]', description: 'Items array (use with renderItem)' },
  { name: 'snap', type: 'string', default: 'start', description: 'start, center, end' },
  { name: 'vertical', type: 'boolean', default: 'false', description: 'Vertical scroll' },
  { name: 'showControls', type: 'boolean', default: 'false', description: 'Prev/next buttons' },
  { name: 'showIndicators', type: 'boolean', default: 'false', description: 'Dot indicators' },
  { name: 'autoPlay', type: 'number', default: '0', description: 'Auto-play interval in ms' },
  { name: 'renderItem', type: 'Snippet<[item, index]>', description: 'Custom item renderer' },
  childrenProp, classProp
];

// Data Input
export const textInputProps: PropDef[] = [
  { name: 'value', type: 'string', description: '$bindable — input value' },
  { name: 'type', type: 'string', default: 'text', description: 'text, email, password, number, url, tel, date, search' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text' },
  sizeProp, colorVariantProp,
  { name: 'bordered', type: 'boolean', default: 'true', description: 'Show border' },
  { name: 'ghost', type: 'boolean', default: 'false', description: 'Ghost style' },
  classProp, restProp
];

export const selectProps: PropDef[] = [
  { name: 'value', type: 'string', description: '$bindable — selected value' },
  { name: 'options', type: 'array', description: '[{ value, label, disabled? }]' },
  { name: 'placeholder', type: 'string', description: 'Placeholder option' },
  sizeProp, colorVariantProp,
  { name: 'bordered', type: 'boolean', default: 'true', description: 'Show border' },
  classProp, restProp
];

export const checkboxProps: PropDef[] = [
  { name: 'checked', type: 'boolean', description: '$bindable — checked state' },
  { name: 'label', type: 'string', description: 'Label text' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state' },
  sizeProp, colorVariantProp, classProp, restProp
];

export const toggleProps: PropDef[] = [
  { name: 'checked', type: 'boolean', description: '$bindable — toggle state' },
  { name: 'label', type: 'string', description: 'Label text' },
  sizeProp, colorVariantProp, classProp, restProp
];

export const radioProps: PropDef[] = [
  { name: 'value', type: 'string', description: 'Option value' },
  { name: 'group', type: 'string', description: '$bindable — selected group value' },
  { name: 'label', type: 'string', description: 'Label text' },
  { name: 'name', type: 'string', description: 'Radio group name' },
  sizeProp, colorVariantProp, classProp, restProp
];

export const rangeProps: PropDef[] = [
  { name: 'value', type: 'number', default: '50', description: '$bindable — slider value' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum' },
  { name: 'step', type: 'number', default: '1', description: 'Step increment' },
  colorVariantProp, sizeProp, classProp, restProp
];

export const ratingProps: PropDef[] = [
  { name: 'value', type: 'number', default: '0', description: '$bindable — current rating' },
  { name: 'max', type: 'number', default: '5', description: 'Max stars' },
  { name: 'half', type: 'boolean', default: 'false', description: 'Half-star support' },
  sizeProp, classProp
];

export const calendarProps: PropDef[] = [
  { name: 'value', type: 'string', description: '$bindable — selected date (YYYY-MM-DD)' },
  { name: 'min', type: 'string', description: 'Min selectable date' },
  { name: 'max', type: 'string', description: 'Max selectable date' },
  { name: 'onChange', type: 'function', description: '(date: string) => void' },
  classProp
];

export const dateRangeProps: PropDef[] = [
  { name: 'startDate', type: 'string', description: '$bindable — start date (YYYY-MM-DD)' },
  { name: 'endDate', type: 'string', description: '$bindable — end date (YYYY-MM-DD)' },
  { name: 'min', type: 'string', description: 'Min selectable date' },
  { name: 'max', type: 'string', description: 'Max selectable date' },
  { name: 'onChange', type: 'function', description: '({ start, end }) => void' },
  classProp
];

export const dropZoneProps: PropDef[] = [
  { name: 'accept', type: 'string', description: 'Accepted file types (e.g., ".jpg,.png,image/*")' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple files' },
  { name: 'maxSize', type: 'number', description: 'Max file size in bytes' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  { name: 'onDrop', type: 'function', description: '(files: File[]) => void' },
  { name: 'onError', type: 'function', description: '(message: string) => void' },
  childrenProp, classProp
];

export const searchInputProps: PropDef[] = [
  { name: 'value', type: 'string', description: '$bindable — search value' },
  { name: 'placeholder', type: 'string', default: 'Search...', description: 'Placeholder text' },
  sizeProp,
  { name: 'debounce', type: 'number', default: '300', description: 'Debounce delay in ms' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
  { name: 'onSearch', type: 'function', description: '(term: string) => void' },
  classProp, restProp
];

export const formFieldProps: PropDef[] = [
  { name: 'name', type: 'string', description: 'Field name (required)' },
  { name: 'label', type: 'string', description: 'Label text' },
  { name: 'type', type: 'string', default: 'text', description: 'text, email, password, number, select, textarea, checkbox, etc.' },
  { name: 'value', type: 'string | number | boolean', description: 'Field value' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Required field' },
  { name: 'error', type: 'string', description: 'Error message' },
  { name: 'helpText', type: 'string', description: 'Help text below field' },
  { name: 'options', type: 'array', description: '[{ value, label }] for select type' },
  { name: 'rows', type: 'number', default: '3', description: 'Textarea rows' },
  classProp
];

// Feedback
export const alertProps: PropDef[] = [
  colorVariantProp,
  { name: 'icon', type: 'string', description: 'Custom icon name (auto per variant by default)' },
  childrenProp, classProp, restProp
];

export const loadingProps: PropDef[] = [
  { name: 'type', type: 'string', default: 'spinner', description: 'spinner, dots, ring, ball, bars, infinity' },
  sizeProp, colorVariantProp, classProp
];

export const progressProps: PropDef[] = [
  { name: 'value', type: 'number', description: 'Progress value (omit for indeterminate)' },
  { name: 'max', type: 'number', default: '100', description: 'Max value' },
  colorVariantProp, classProp
];

export const tooltipProps: PropDef[] = [
  { name: 'tip', type: 'string', description: 'Tooltip text' },
  { name: 'position', type: 'string', default: 'top', description: 'top, bottom, left, right' },
  colorVariantProp,
  { name: 'open', type: 'boolean', default: 'false', description: 'Force open' },
  childrenProp, classProp
];

// Layout
export const cardProps: PropDef[] = [
  { name: 'title', type: 'string', description: 'Card title' },
  { name: 'description', type: 'string', description: 'Subtitle' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Compact padding' },
  { name: 'flat', type: 'boolean', default: 'false', description: 'No shadow' },
  { name: 'headerActions', type: 'Snippet', description: 'Actions in title row' },
  childrenProp, classProp, restProp
];

export const dividerProps: PropDef[] = [
  { name: 'text', type: 'string', description: 'Divider label' },
  { name: 'vertical', type: 'boolean', default: 'false', description: 'Vertical orientation' },
  colorVariantProp, classProp
];

export const drawerProps: PropDef[] = [
  { name: 'open', type: 'boolean', description: '$bindable — drawer state' },
  { name: 'id', type: 'string', default: 'app-drawer', description: 'Unique ID' },
  { name: 'side', type: 'string', default: 'left', description: 'left or right' },
  { name: 'sidebar', type: 'Snippet', description: 'Sidebar content' },
  childrenProp, classProp
];

// Navigation
export const paginationProps: PropDef[] = [
  { name: 'page', type: 'number', default: '1', description: '$bindable — current page' },
  { name: 'totalPages', type: 'number', description: 'Total pages' },
  sizeProp,
  { name: 'onChange', type: 'function', description: '(page: number) => void' },
  classProp
];

export const menuProps: PropDef[] = [
  { name: 'horizontal', type: 'boolean', default: 'false', description: 'Horizontal layout' },
  sizeProp,
  { name: 'rounded', type: 'boolean', default: 'true', description: 'Rounded corners' },
  childrenProp, classProp
];

export const navbarProps: PropDef[] = [
  { name: 'start', type: 'Snippet', description: 'Left section' },
  { name: 'center', type: 'Snippet', description: 'Center section' },
  { name: 'end', type: 'Snippet', description: 'Right section' },
  classProp
];

// Composites
export const modalProps: PropDef[] = [
  { name: 'open', type: 'boolean', description: '$bindable — visibility' },
  { name: 'title', type: 'string', description: 'Header text' },
  { name: 'size', type: 'string', default: 'md', description: 'sm, md, lg, xl' },
  { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close on backdrop click' },
  { name: 'onclose', type: 'function', description: 'Called on close' },
  { name: 'footer', type: 'Snippet', description: 'Footer actions area' },
  childrenProp
];

export const dataGridProps: PropDef[] = [
  { name: 'items', type: 'any[]', description: 'Row data' },
  { name: 'columns', type: 'Column[]', description: '[{ key, label, sortable?, width?, align?, visible?, editable?, editType?, editOptions?, render? }]' },
  { name: 'pagination', type: 'object', description: '{ page, totalCount, totalPages }' },
  { name: 'filters', type: 'Filter[]', description: '[{ key, label, type, options?, value? }]' },
  { name: 'bulkActions', type: 'BulkAction[]', description: '[{ label, icon?, variant?, confirm?, action }]' },
  { name: 'onSearch', type: 'function', description: '(query: string) => void' },
  { name: 'onSort', type: 'function', description: '(key: string, dir: "asc" | "desc") => void' },
  { name: 'onPageChange', type: 'function', description: '(page: number) => void' },
  { name: 'onFilterChange', type: 'function', description: '(filters: Record<string, string>) => void' },
  { name: 'onCellEdit', type: 'function', description: '(itemId: string, key: string, value: any) => void' },
  { name: 'onRowClick', type: 'function', description: '(item: any) => void' },
  { name: 'onSaveView', type: 'function', description: '(view: SavedView) => void' },
  { name: 'onDeleteView', type: 'function', description: '(viewId: string) => void' },
  { name: 'onViewChange', type: 'function', description: '(view: SavedView | null) => void' },
  { name: 'savedViews', type: 'SavedView[]', description: 'Saved view configurations' },
  { name: 'entityName', type: 'string', default: 'items', description: 'Label for empty state and export' },
  { name: 'searchQuery', type: 'string', description: 'Controlled search value' },
  { name: 'sortBy', type: 'string', description: 'Controlled sort column' },
  { name: 'sortDir', type: 'string', default: 'asc', description: 'Controlled sort direction' },
  { name: 'exportable', type: 'boolean', default: 'true', description: 'Show CSV export button' },
  { name: 'expandable', type: 'boolean', default: 'false', description: 'Enable row expansion' },
  { name: 'expandContent', type: 'Snippet<[item]>', description: 'Expanded row content' },
  { name: 'idKey', type: 'string', default: 'id', description: 'Key for row identity' },
  classProp
];

export const dataTableProps: PropDef[] = [
  { name: 'items', type: 'any[]', description: 'Row data' },
  { name: 'columns', type: 'Column[]', description: '[{ key, label, sortable?, render?, renderHtml?, className? }]' },
  { name: 'actions', type: 'Action[]', description: '[{ label, icon?, href?, onClick?, variant?, hidden? }]' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Show search bar' },
  { name: 'onSearch', type: 'function', description: '(term: string) => void' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Checkbox selection' },
  { name: 'selectedItems', type: 'any[]', description: '$bindable — selected items' },
  { name: 'onSelectionChange', type: 'function', description: '(items: any[]) => void' },
  { name: 'onRowClick', type: 'function', description: '(item: any) => void' },
  { name: 'rowClass', type: 'function', description: '(item: any) => string' },
  { name: 'page', type: 'number', description: 'Current page' },
  { name: 'totalPages', type: 'number', description: 'Total pages' },
  { name: 'onPageChange', type: 'function', description: '(page: number) => void' },
  { name: 'totalCount', type: 'number', description: 'Total items (display only)' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Skeleton loading state' },
  { name: 'idKey', type: 'string', default: 'id', description: 'Key for selection identity' },
  { name: 'headerActions', type: 'Snippet', description: 'Buttons next to search' },
  classProp
];

export const autoFormProps: PropDef[] = [
  { name: 'fields', type: 'FieldDef[]', description: 'Field definitions' },
  { name: 'values', type: 'Record<string, any>', description: '$bindable — form values' },
  { name: 'errors', type: 'Record<string, string>', description: 'Per-field error messages' },
  { name: 'columns', type: 'number', default: '1', description: '1, 2, or 3 column layout' },
  { name: 'submitLabel', type: 'string', default: 'Save', description: 'Submit button text' },
  { name: 'cancelLabel', type: 'string', default: 'Cancel', description: 'Cancel button text' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
  { name: 'onsubmit', type: 'function', description: '(values: Record<string, any>) => void' },
  { name: 'oncancel', type: 'function', description: '() => void' },
  { name: 'header', type: 'Snippet', description: 'Content above form' },
  { name: 'footer', type: 'Snippet', description: 'Custom footer (replaces default buttons)' },
  classProp
];

export const chatPanelProps: PropDef[] = [
  { name: 'messages', type: 'Message[]', description: '[{ id, sender, text, time?, position?, avatar?, variant? }]' },
  { name: 'title', type: 'string', default: 'Chat', description: 'Header title' },
  { name: 'placeholder', type: 'string', default: 'Type a message...', description: 'Input placeholder' },
  { name: 'onSend', type: 'function', description: '(text: string) => void' },
  { name: 'header', type: 'Snippet', description: 'Custom header' },
  { name: 'renderMessage', type: 'Snippet<[Message]>', description: 'Custom message renderer' },
  classProp
];

export const confirmDialogProps: PropDef[] = [
  { name: 'open', type: 'boolean', description: '$bindable — visibility' },
  { name: 'title', type: 'string', default: 'Confirm', description: 'Dialog title' },
  { name: 'message', type: 'string', default: 'Are you sure?', description: 'Body message' },
  { name: 'confirmLabel', type: 'string', default: 'Delete', description: 'Confirm button text' },
  { name: 'confirmVariant', type: 'string', default: 'error', description: 'Confirm button color' },
  { name: 'onConfirm', type: 'function', description: '() => void' },
  { name: 'onCancel', type: 'function', description: '() => void' }
];

export const pageHeaderProps: PropDef[] = [
  { name: 'title', type: 'string', description: 'Page title' },
  { name: 'subtitle', type: 'string', description: 'Subtitle' },
  { name: 'breadcrumbs', type: 'array', description: '[{ label, href? }]' },
  { name: 'actions', type: 'Snippet', description: 'Action buttons' }
];

export const tabsProps: PropDef[] = [
  { name: 'tabs', type: 'array', description: '[{ key, label, icon?, disabled?, content? }]' },
  { name: 'activeTab', type: 'string', description: '$bindable — active tab key' },
  { name: 'variant', type: 'string', default: 'bordered', description: 'bordered, lifted, boxed' },
  sizeProp,
  { name: 'onChange', type: 'function', description: '(key: string) => void' }
];

export const emptyStateProps: PropDef[] = [
  { name: 'icon', type: 'string', default: 'database', description: 'Icon name' },
  { name: 'title', type: 'string', description: 'Title text' },
  { name: 'message', type: 'string', default: 'No items found.', description: 'Body message' },
  { name: 'actions', type: 'Snippet', description: 'Action buttons' },
  classProp
];

export const iconProps: PropDef[] = [
  { name: 'name', type: 'string', description: 'Icon name (see icon list)' },
  { name: 'size', type: 'number', default: '20', description: 'Icon size in px' },
  classProp
];
