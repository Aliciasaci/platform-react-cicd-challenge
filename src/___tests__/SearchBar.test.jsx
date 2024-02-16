import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeRangePicker from '../components/TimeRangePicker';

describe('TimeRangePicker component', () => {

    test('renders "Closed" text when show is false', () => {
        render(<TimeRangePicker show={false} />);

        // Check if the "Closed" text is rendered
        const closedText = screen.getByText(/Closed/i);

        expect(closedText).toBeInTheDocument();
    });
});
