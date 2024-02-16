import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeRangePicker from '../components/TimeRangePicker';

describe('TimeRangePicker component', () => {
    // test('renders time range dropdowns', () => {
    //     render(<TimeRangePicker show={true} />);

    //     // Check if all dropdowns are rendered
    //     const startHourDropdown = screen.getByText(/09/i);
    //     const startMinuteDropdown = screen.getByText(/00/i);
    //     const endHourDropdown = screen.getByText(/19/i);
    //     const endMinuteDropdown = screen.getByText(/00/i);

    //     expect(startHourDropdown).toBeInTheDocument();
    //     expect(startMinuteDropdown).toBeInTheDocument();
    //     expect(endHourDropdown).toBeInTheDocument();
    //     expect(endMinuteDropdown).toBeInTheDocument();
    // });

    // test('triggers time range change when dropdown value is selected', () => {
    //     const mockOnTimeRangeChange = jest.fn();
    //     render(<TimeRangePicker show={true} onTimeRangeChange={mockOnTimeRangeChange} />);

    //     // Simulate selecting a different hour for start time
    //     const startHourDropdown = screen.getByText(/09/i);
    //     fireEvent.click(startHourDropdown);
    //     const newStartHour = screen.getByText(/10/i);
    //     fireEvent.click(newStartHour);
    //     expect(mockOnTimeRangeChange).toHaveBeenCalled();

    //     // Simulate selecting a different minute for end time
    //     const endMinuteDropdown = screen.getByText(/00/i);
    //     fireEvent.click(endMinuteDropdown);
    //     const newEndMinute = screen.getByText(/30/i);
    //     fireEvent.click(newEndMinute);
    //     expect(mockOnTimeRangeChange).toHaveBeenCalledTimes(2); // Ensure the function is called again
    // });

    test('renders "Closed" text when show is false', () => {
        render(<TimeRangePicker show={false} />);

        // Check if the "Closed" text is rendered
        const closedText = screen.getByText(/Closed/i);

        expect(closedText).toBeInTheDocument();
    });
});
