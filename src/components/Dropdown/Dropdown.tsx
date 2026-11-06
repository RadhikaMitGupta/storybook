import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Modal,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';

import type {
  DropdownOption,
  DropdownProps,
} from './Dropdown.types';

import { styles } from './Dropdown.styles';

import {
  useDropdownSelection,
} from './hooks/useDropdownSelection';

import {
  useDropdownPosition,
} from './hooks/useDropdownPosition';

import DropdownTrigger from './components/DropdownTrigger';
import DropdownMenu from './components/DropdownMenu';

const Dropdown: React.FC<DropdownProps> = ({
  options,
  variant = 'default',
  value,
  defaultValue,
  multiple,
  disabled = false,
  searchable = false,
  placeholder = 'Placeholder Text',
  searchPlaceholder = 'Search options...',
  emptyMessage = 'No options found',
  maxVisibleTags = 3,
  maxDropdownHeight = 240,
  onChange,
  onOpen,
  onClose,
  containerStyle,
  menuStyle,
  accessibilityLabel,
  testID,
}) => {
  const triggerRef = useRef<View>(null);

  const { width, height } = useWindowDimensions();

  const isMultiple =
    multiple ?? variant === 'captured_multi';

  const isDisabled =
    disabled || variant === 'disabled';

  const {
    selectedSet,
    selectedOptions,
    selectOption,
    removeOption,
  } = useDropdownSelection({
    options,
    value,
    defaultValue,
    multiple: isMultiple,
    onChange,
  });

  const [visible, setVisible] = useState(false);

  const {
    position,
    measure,
    clear,
  } = useDropdownPosition(
    width,
    height,
    maxDropdownHeight,
  );

  const closeMenu = useCallback(() => {
    setVisible(false);
    clear();
    onClose?.();
  }, [clear, onClose]);

  const openMenu = useCallback(() => {
    if (isDisabled || visible) return;

    triggerRef.current?.measureInWindow(
      (x, y, w, h) => {
        measure({
          x,
          y,
          width: w,
          height: h,
        });

        setVisible(true);
        onOpen?.();
      },
    );
  }, [
    isDisabled,
    measure,
    onOpen,
    visible,
  ]);

  // Active variant automatically opens in Storybook.
  useEffect(() => {
    if (variant !== 'active' || isDisabled) {
      if (visible) closeMenu();
      return;
    }

    const frame = requestAnimationFrame(openMenu);

    return () => cancelAnimationFrame(frame);

    // Intentionally triggered only by variant changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, isDisabled]);

  // Recalculate menu position after rotation or resize.
  useEffect(() => {
    if (!visible) return;

    const frame = requestAnimationFrame(() => {
      triggerRef.current?.measureInWindow(
        (x, y, w, h) => {
          measure({
            x,
            y,
            width: w,
            height: h,
          });
        },
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [
    width,
    height,
    visible,
    measure,
  ]);

  const handleSelect = useCallback(
    (option: DropdownOption) => {
      selectOption(option);

      if (!isMultiple) {
        closeMenu();
      }
    },
    [
      selectOption,
      isMultiple,
      closeMenu,
    ],
  );

  const handleTriggerPress = useCallback(() => {
    if (visible) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [
    visible,
    closeMenu,
    openMenu,
  ]);

  return (
    <View
      ref={triggerRef}
      collapsable={false}
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      <DropdownTrigger
        placeholder={placeholder}
        selectedOptions={selectedOptions}
        multiple={isMultiple}
        disabled={isDisabled}
        expanded={visible}
        variant={variant}
        maxVisibleTags={maxVisibleTags}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        onPress={handleTriggerPress}
        onRemove={removeOption}
      />

      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.backdrop}
            onPress={closeMenu}
            accessible={false}
          />

          {position && position.maxHeight > 0 && (
            <DropdownMenu
              options={options}
              selectedSet={selectedSet}
              multiple={isMultiple}
              searchable={searchable}
              searchPlaceholder={searchPlaceholder}
              emptyMessage={emptyMessage}
              maxHeight={position.maxHeight}
              panelStyle={[
                {
                  position: 'absolute',
                  left: position.left,
                  top: position.top,
                  width: position.width,
                },
                menuStyle,
              ]}
              onSelect={handleSelect}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;