import React, {
  memo,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type {
  DropdownOption,
} from '../Dropdown.types';
import { styles } from '../Dropdown.styles';
import DropdownOptionItem from './DropdownOptionItem';
interface Props {
  options: DropdownOption[];
  selectedSet: ReadonlySet<string>;
  multiple: boolean;
  searchable: boolean;
  searchPlaceholder: string;
  emptyMessage: string;
  maxHeight: number;
  panelStyle?: StyleProp<ViewStyle>;
  onSelect: (option: DropdownOption) => void;
}
function DropdownMenu({
  options,
  selectedSet,
  multiple,
  searchable,
  searchPlaceholder,
  emptyMessage,
  maxHeight,
  panelStyle,
  onSelect,
}: Props) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const normalizedQuery =
      query.trim().toLocaleLowerCase();
    if (!normalizedQuery) {
      return options;
    }
    return options.filter(option =>
      option.label
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    );
  }, [options, query]);
  return (
    <View
      style={[
        styles.menu,
        { maxHeight },
        panelStyle,
      ]}
    >
      {searchable && (
        <View style={styles.searchWrap}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            style={styles.search}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            accessibilityLabel={searchPlaceholder}
          />
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={item => item.value}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
        renderItem={({ item }) => (
          <DropdownOptionItem
            option={item}
            selected={selectedSet.has(item.value)}
            multiple={multiple}
            onSelect={onSelect}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {emptyMessage}
          </Text>
        }
      />
    </View>
  );
}

export default memo(DropdownMenu);