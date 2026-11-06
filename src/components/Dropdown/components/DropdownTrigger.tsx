import React, { memo } from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import type {
  DropdownOption,
  DropdownVariant,
} from '../Dropdown.types';
import { styles } from '../Dropdown.styles';
interface Props {
  placeholder: string;
  selectedOptions: DropdownOption[];
  multiple: boolean;
  disabled: boolean;
  expanded: boolean;
  variant: DropdownVariant;
  maxVisibleTags: number;
  accessibilityLabel?: string;
  testID?: string;
  onPress: () => void;
  onRemove: (value: string) => void;
}
function DropdownTrigger({
  placeholder,
  selectedOptions,
  multiple,
  disabled,
  expanded,
  variant,
  maxVisibleTags,
  accessibilityLabel,
  testID,
  onPress,
  onRemove,
}: Props) {
  const variantStyle =
    disabled || variant === 'disabled'
      ? styles.disabled
      : variant === 'hover'
        ? styles.hover
        : variant === 'focused' ||
            variant === 'active'
          ? styles.focused
          : undefined;

  const renderContent = () => {
    if (!multiple) {
      const selected = selectedOptions[0];

      return (
        <Text
          numberOfLines={1}
          style={
            selected
              ? styles.text
              : styles.placeholder
          }
        >
          {selected?.label ?? placeholder}
        </Text>
      );
    }
    if (!selectedOptions.length) {
      return (
        <Text style={styles.placeholder}>
          {placeholder}
        </Text>
      );
    }
    const visibleOptions =
      selectedOptions.slice(0, maxVisibleTags);
    const remaining =
      selectedOptions.length - visibleOptions.length;
    return (
      <View style={styles.chips}>
        {visibleOptions.map(option => (
          <View
            key={option.value}
            style={styles.chip}
          >
            <Text
              numberOfLines={1}
              style={styles.chipText}
            >
              {option.label}
            </Text>

            {!disabled && (
              <Pressable
                hitSlop={6}
                onPress={() => onRemove(option.value)}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${option.label}`}
              >
                <Text style={styles.chipRemove}>
                  ×
                </Text>
              </Pressable>
            )}
          </View>
        ))}

        {remaining > 0 && (
          <Text style={styles.more}>
            +{remaining} more
          </Text>
        )}
      </View>
    );
  };

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ?? placeholder
      }
      accessibilityState={{
        disabled,
        expanded,
      }}
      style={[
        styles.trigger,
        variantStyle,
      ]}
    >
      <View style={styles.triggerContent}>
        {renderContent()}
      </View>

      <Text
        accessible={false}
        style={styles.arrow}
      >
        {expanded ? '⌃' : '⌄'}
      </Text>
    </Pressable>
  );
}

export default memo(DropdownTrigger);