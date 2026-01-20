import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import './setupTests';

const mockClusterInfo = {
  podName: 'test-pod-123',
  namespace: 'test-namespace',
  nodeName: 'test-node',
  clusterName: 'test-cluster',
  appVersion: '1.0.0',
  timestamp: '2024-01-01T00:00:00.000Z'
};

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main page with title', async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockClusterInfo)
    } as Response);

    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Kubernetes Cluster Info/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/If you can see this page/i)).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    global.fetch = jest
      .fn<typeof fetch>()
      .mockImplementation(() => new Promise(() => {}));

    render(<App />);

    expect(screen.getByText(/Loading cluster info/i)).toBeInTheDocument();
  });

  it('displays cluster info after successful fetch', async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockClusterInfo)
    } as Response);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('test-pod-123')).toBeInTheDocument();
    });

    expect(screen.getByText('test-namespace')).toBeInTheDocument();
    expect(screen.getByText('test-node')).toBeInTheDocument();
    expect(screen.getByText('test-cluster')).toBeInTheDocument();
    expect(screen.getByText(/App version: 1.0.0/)).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: false,
      status: 500
    } as Response);

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to load cluster info: HTTP 500/i)
      ).toBeInTheDocument();
    });
  });

  it('has a refresh button when data is loaded', async () => {
    global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockClusterInfo)
    } as Response);

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Refresh info/i })
      ).toBeInTheDocument();
    });
  });
});
