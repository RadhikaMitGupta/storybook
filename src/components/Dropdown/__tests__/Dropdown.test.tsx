import React from 'react';

import {
  render,
} from '@testing-library/react-native';

import Dropdown from '../Dropdown';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

describe('Dropdown', () => {
  it('renders placeholder', () => {
    const { getByText } = render(
      <Dropdown options={options} />,
    );

    expect(
      getByText('Placeholder Text'),
    ).toBeTruthy();
  });

  it('renders initial selected value', () => {
    const { getByText } = render(
      <Dropdown
        options={options}
        defaultValue="apple"
      />,
    );

    expect(
      getByText('Apple'),
    ).toBeTruthy();
  });

  it('respects controlled null value', () => {
    const { getByText } = render(
      <Dropdown
        options={options}
        value={null}
        defaultValue="apple"
      />,
    );

    expect(
      getByText('Placeholder Text'),
    ).toBeTruthy();
  });

  it('disables trigger for disabled variant', () => {
    const { getByTestId } = render(
      <Dropdown
        options={options}
        variant="disabled"
        testID="dropdown-trigger"
      />,
    );

    expect(
      getByTestId('dropdown-trigger')
        .props.accessibilityState.disabled,
    ).toBe(true);
  });
});