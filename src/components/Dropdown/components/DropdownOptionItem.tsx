import React, { memo } from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

import type {
  DropdownOption,
} from '../Dropdown.types';

import { styles } from '../Dropdown.styles';

interface Props {
  option: DropdownOption;
  selected: boolean;
  multiple: boolean;
  onSelect: (option: DropdownOption) => void;
}

function DropdownOptionItem({
  option,
  selected,
  multiple,
  onSelect,
}: Props) {
  return (
    <Pressable
      onPress={() => onSelect(option)}
      disabled={option.disabled}
      accessibilityRole={
        multiple ? 'checkbox' : 'radio'
      }
      accessibilityLabel={option.label}
      accessibilityState={{
        checked: selected,
        disabled: Boolean(option.disabled),
      }}
      style={({ pressed }) => [
        styles.option,
        pressed && styles.optionPressed,
        selected && styles.optionSelected,
        option.disabled && styles.optionDisabled,
      ]}
    >
      {multiple && (
        <View
          style={[
            styles.checkbox,
            selected && styles.checkboxChecked,
          ]}
        >
          {selected && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>
      )}

      <Text
        numberOfLines={1}
        style={[
          styles.optionText,
          selected && styles.optionSelectedText,
        ]}
      >
        {option.label}
      </Text>
    </Pressable>
  );
}

export default memo(DropdownOptionItem);