import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import EgyptCoverageMap from '@/components/coverage/EgyptCoverageMap';

describe('EgyptCoverageMap', () => {
  it('renders all city labels', () => {
    render(<EgyptCoverageMap />);
    expect(screen.getByText('Cairo')).toBeInTheDocument();
    expect(screen.getByText('Alexandria')).toBeInTheDocument();
    expect(screen.getByText('Aswan')).toBeInTheDocument();
  });

  it('shows area manager popup when a rep city is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<EgyptCoverageMap />);

    const cairo = container.querySelector('[data-city-id="cairo"] .coverage-map-marker');
    expect(cairo).toBeTruthy();
    await user.click(cairo as Element);

    expect(within(container).getByRole('dialog')).toBeInTheDocument();
    expect(within(container).getByText(/Area manager · Ahmed Hassan/i)).toBeInTheDocument();
    expect(within(container).getByRole('link', { name: /\+20/i })).toHaveAttribute(
      'href',
      expect.stringContaining('tel:'),
    );
  });

  it('shows e-commerce message for non-rep cities', async () => {
    const user = userEvent.setup();
    const { container } = render(<EgyptCoverageMap />);

    const hurghada = container.querySelector('[data-city-id="hurghada"] .coverage-map-marker');
    expect(hurghada).toBeTruthy();
    await user.click(hurghada as Element);

    expect(within(container).getByText(/Nationwide Bosta delivery/i)).toBeInTheDocument();
    expect(within(container).getByText(/Order online or contact our Cairo hub/i)).toBeInTheDocument();
    expect(within(container).queryByText(/Area manager ·/i)).not.toBeInTheDocument();
  });

  it('closes popup on Escape', async () => {
    const user = userEvent.setup();
    const { container } = render(<EgyptCoverageMap />);

    const cairo = container.querySelector('[data-city-id="cairo"] .coverage-map-marker');
    await user.click(cairo as Element);
    expect(within(container).getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(within(container).queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('dims cities outside the highlighted zone', () => {
    const { container } = render(<EgyptCoverageMap highlightZoneId="delta" />);
    const dimmed = container.querySelector('.coverage-map-city.is-dim');
    expect(dimmed).toBeTruthy();
  });
});
