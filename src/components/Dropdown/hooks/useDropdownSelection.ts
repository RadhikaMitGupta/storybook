import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import type {
  DropdownOption,
  DropdownValue,
} from '../Dropdown.types';

interface Params {
  options: DropdownOption[];
  value?: DropdownValue;
  defaultValue?: DropdownValue;
  multiple: boolean;
  onChange?: (value: DropdownValue) => void;
}

const normalize = (
  value: DropdownValue | undefined,
  multiple: boolean,
): DropdownValue => {
  if (multiple) {
    return Array.isArray(value)
      ? value
      : value == null
        ? []
        : [value];
  }

  return Array.isArray(value)
    ? value[0] ?? null
    : value ?? null;
};

export function useDropdownSelection({
  options,
  value,
  defaultValue,
  multiple,
  onChange,
}: Params) {
  const [internal, setInternal] = useState<DropdownValue>(
    () => normalize(defaultValue, multiple),
  );

  // Explicit undefined check preserves controlled null values.
  const current =
    value !== undefined ? value : internal;

  const selectedValues = useMemo(() => {
    const normalized = normalize(current, multiple);

    return Array.isArray(normalized)
      ? normalized
      : normalized
        ? [normalized]
        : [];
  }, [current, multiple]);

  const selectedSet = useMemo(
    () => new Set(selectedValues),
    [selectedValues],
  );

  const selectedOptions = useMemo(
    () => options.filter(option =>
      selectedSet.has(option.value),
    ),
    [options, selectedSet],
  );

  const commit = useCallback(
    (next: DropdownValue) => {
      const normalized = normalize(next, multiple);

      if (value === undefined) {
        setInternal(normalized);
      }

      onChange?.(normalized);
    },
    [multiple, onChange, value],
  );

  const selectOption = useCallback(
    (option: DropdownOption) => {
      if (option.disabled) return;

      if (!multiple) {
        commit(option.value);
        return;
      }

      const next = selectedSet.has(option.value)
        ? selectedValues.filter(
            item => item !== option.value,
          )
        : [...selectedValues, option.value];

      commit(next);
    },
    [
      commit,
      multiple,
      selectedSet,
      selectedValues,
    ],
  );

  const removeOption = useCallback(
    (optionValue: string) => {
      commit(
        multiple
          ? selectedValues.filter(
              item => item !== optionValue,
            )
          : null,
      );
    },
    [commit, multiple, selectedValues],
  );

  return {
    selectedValues,
    selectedSet,
    selectedOptions,
    selectOption,
    removeOption,
  };
}