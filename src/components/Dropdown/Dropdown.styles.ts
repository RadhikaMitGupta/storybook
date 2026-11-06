import { StyleSheet } from 'react-native';
import { theme } from './Dropdown.theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  trigger: {
    minHeight: theme.size.triggerHeight,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: theme.size.radius,
    backgroundColor: theme.color.background,
    flexDirection: 'row',
    alignItems: 'center',
  },

  triggerContent: {
    flex: 1,
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  hover: {
    borderColor: theme.color.hoverBorder,
    backgroundColor: theme.color.hover,
  },

  focused: {
    borderColor: theme.color.primary,
    borderWidth: 1.5,
  },

  disabled: {
    borderColor: '#E5E5E5',
    backgroundColor: theme.color.disabled,
  },

  text: {
    fontSize: theme.font.input,
    color: theme.color.text,
    flexShrink: 1,
  },

  placeholder: {
    fontSize: theme.font.input,
    color: theme.color.placeholder,
  },

  arrow: {
    marginLeft: 8,
    fontSize: 17,
    color: theme.color.secondary,
  },

  chips: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 4,
  },

  chip: {
    maxWidth: 110,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: theme.color.chip,
  },

  chipText: {
    flexShrink: 1,
    fontSize: theme.font.chip,
    color: theme.color.text,
  },

  chipRemove: {
    fontSize: 13,
    color: theme.color.secondary,
  },

  more: {
    fontSize: theme.font.chip,
    color: theme.color.secondary,
  },

  modalRoot: {
    flex: 1,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  menu: {
    position: 'absolute',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.color.divider,
    borderRadius: theme.size.radius,
    backgroundColor: theme.color.background,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  searchWrap: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.divider,
  },

  search: {
    height: 32,
    padding: 0,
    fontSize: theme.font.input,
    color: theme.color.text,
  },

  option: {
    minHeight: theme.size.optionHeight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  optionPressed: {
    backgroundColor: theme.color.hover,
  },

  optionSelected: {
    backgroundColor: theme.color.selected,
  },

  optionDisabled: {
    opacity: 0.4,
  },

  optionText: {
    flex: 1,
    fontSize: theme.font.option,
    color: theme.color.text,
  },

  optionSelectedText: {
    color: theme.color.primary,
  },

  checkbox: {
    width: theme.size.checkbox,
    height: theme.size.checkbox,
    borderWidth: 1,
    borderColor: theme.color.checkbox,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxChecked: {
    backgroundColor: theme.color.primary,
    borderColor: theme.color.primary,
  },

  checkmark: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },

  empty: {
    padding: 16,
    textAlign: 'center',
    fontSize: theme.font.option,
    color: theme.color.secondary,
  },
});