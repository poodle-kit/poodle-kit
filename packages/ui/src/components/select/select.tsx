import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
  type MutableRefObject,
} from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useTypeahead,
  useInteractions,
  offset,
  flip,
  size,
  type Placement,
  type FloatingContext,
  type ReferenceType,
} from '@floating-ui/react';

export interface SelectContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string | undefined;
  onValueChange: (value: string) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  selectedLabel: string | undefined;
  setSelectedLabel: (label: string | undefined) => void;
  listRef: MutableRefObject<(HTMLElement | null)[]>;
  listContentRef: MutableRefObject<(string | null)[]>;
  getReferenceProps: (
    userProps?: React.HTMLProps<Element>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> & {
      active?: boolean;
      selected?: boolean;
    },
  ) => Record<string, unknown>;
  refs: ReturnType<typeof useFloating<ReferenceType>>['refs'];
  floatingStyles: React.CSSProperties;
  context: FloatingContext;
  disabled?: boolean;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(
  componentName: string,
): SelectContextValue {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error(
      `<${componentName}> must be used within <Select>`,
    );
  }
  return ctx;
}

export interface SelectProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  placement?: Placement;
}

function Select({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled,
  placement = 'bottom-start',
}: SelectProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const [valueState, setValueState] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    null,
  );
  const [selectedLabel, setSelectedLabel] = useState<
    string | undefined
  >(undefined);

  const isControlledOpen = openProp !== undefined;
  const isControlledValue = valueProp !== undefined;

  const open = isControlledOpen ? openProp : openState;
  const value = isControlledValue ? valueProp : valueState;

  const listRef = useRef<(HTMLElement | null)[]>([]);
  const listContentRef = useRef<(string | null)[]>([]);

  const handleOpenChange = (next: boolean) => {
    if (!isControlledOpen) setOpenState(next);
    onOpenChange?.(next);
  };

  const handleValueChange = (next: string) => {
    if (!isControlledValue) setValueState(next);
    onValueChange?.(next);
  };

  const { refs, floatingStyles, context } =
    useFloating<ReferenceType>({
      open,
      onOpenChange: handleOpenChange,
      placement,
      middleware: [
        offset(4),
        flip({ padding: 8 }),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              minWidth: `${rects.reference.width}px`,
            });
          },
          padding: 8,
        }),
      ],
    });

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: open ? setActiveIndex : setSelectedIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } =
    useInteractions([click, dismiss, role, listNav, typeahead]);

  return (
    <SelectContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        value,
        onValueChange: handleValueChange,
        activeIndex,
        setActiveIndex,
        selectedIndex,
        setSelectedIndex,
        selectedLabel,
        setSelectedLabel,
        listRef,
        listContentRef,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        refs,
        floatingStyles,
        context,
        disabled,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

Select.displayName = 'Select';

export { Select };
