import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '@/components';

describe('Button', () => {
  it('renders the button with the provided text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(
      <Button className='test-button' text={buttonText} />
    );
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button className='test-button' text='Click me' onClick={onClickMock} />
    );
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('disables the button when disabled prop is true', () => {
    const { getByText } = render(
      <Button className='test-button' text='Click me' disabled />
    );
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeDisabled();
  });
});
