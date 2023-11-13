import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders quarter 1', () => {
    render(<App currentQuarter={0} startDate={new Date(Date.UTC(2023, 0, 1))} />);
    const linkElement = screen.getByText('Week 1');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders quarter 2', () => {
    render(<App currentQuarter={1} startDate={new Date(Date.UTC(2023, 0, 1))} />);
    const linkElement = screen.getByText(/Week 14/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders quarter 3', () => {
    render(<App currentQuarter={2} startDate={new Date(Date.UTC(2023, 0, 1))} />);
    const linkElement = screen.getByText(/Week 27/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders quarter 4', () => {
    render(<App currentQuarter={3} startDate={new Date(Date.UTC(2023, 0, 1))} />);
    const linkElement = screen.getByText(/Week 40/i);
    expect(linkElement).toBeInTheDocument();
  });
})
