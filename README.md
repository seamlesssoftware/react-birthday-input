# react-birthday-input

`react-birthday-input` is a flexible and easy-to-use React component designed to capture users' birth dates through three distinct inputs: day, month, and year. This library is born out of the frustration of navigating date pickers to input your birthday.

## Features

- **Locale-aware Date Inputs**: Automatically orders the day, month, and year inputs according to the user's browser preferences using `Intl.DateTimeFormat`.
- **Written in TypeScript**: Offers a fully typed experience, making it easier to develop and maintain your React applications with confidence.
- **User Locale Detection**: Adjusts to the user's locale, ensuring a seamless experience for global audiences.
- **Customizable Styling**: Provides flexibility in styling, allowing you to tailor the appearance of the inputs to match your application's design.
- **Keyboard Navigation**: Supports easy keyboard navigation, enhancing accessibility and usability for all users.

## Installation

Install `react-birthday-input` using npm or yarn:

```bash
npm install react-birthday-input
# or
yarn add react-birthday-input
```

## Styling

You can customize the style of `react-birthday-input` by passing a `className` or `style` prop to the component.

```JSX
<BirthdayInput
  className="my-custom-class"
  style={{ borderColor: 'blue', color: 'red' }}
/>
```
