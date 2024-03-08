# react-birthday-input

A flexible and easy-to-use React component designed to capture users' birth dates through three distinct inputs: day, month, and year. This library is born out of the frustration of navigating date pickers to input your birthday.

## Features

- **Locale-aware Date Inputs**: Automatically orders the day, month, and year inputs according to the user's browser preferences using `Intl.DateTimeFormat`.
- **Written in TypeScript**: Offers a fully typed experience.
- **Customizable Styling**: Provides flexibility in styling, allowing you to tailor the appearance of the inputs to match your application's design.
- **Keyboard Navigation**: Supports easy keyboard navigation, enhancing accessibility and usability for all users.

## Installation

Install `react-birthday-input` using npm or yarn:

```bash
npm install react-birthday-input
# or
yarn add react-birthday-input
```

## Usage

Here's a basic example of how to use react-birthday-input in your project:

```JSX
import React from 'react';
import BirthdayInput from 'react-birthday-input';

function App() {
  const handleDateChange = (date: Date | null) => {
    /* A Date object or null is passed */
    console.log(date);
  };

  return (
    <div>
      <BirthdayInput onChange={handleDateChange} />
    </div>
  );
}

export default App;
```

## Styling

You can customize the style of `react-birthday-input` by passing a `className` or `style` and `inputStyle` prop to the component.

```JSX
<BirthdayInput
  className="my-custom-class"
  style={{ borderColor: 'blue', color: 'red' }}
  inputStyle={{ fontSize: 20 }}
/>
```

## Contributing

Contributions are welcome! Whether it's submitting a bug report, a feature request, or a pull request, all contributions are appreciated. Please ensure you follow our contributing guidelines when submitting your contributions.


## License

react-birthday-input is available under the MIT license. See the LICENSE file for more info.