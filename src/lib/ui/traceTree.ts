import type { TreeNode } from '../sentry/traceParser';
import { formatDuration } from '../utils';

declare global {
  interface Window {
    vis: any;
  }
}

function getNodeColor(duration: number, status: string): string {
  // FIXED COLOR RULES — match expected output

  // 1. ONLY status produces RED
  if (status !== 'ok' && status !== 'unknown') {
    return '#d32f2f'; // RED
  }

  // 2. Duration > 500ms = YELLOW
  if (duration > 500) {
    return '#ffc107'; // YELLOW
  }

  // 3. Everything else = GREEN
  return '#4caf50'; // GREEN
}

export function renderTraceTree(container: HTMLElement, tree: TreeNode, errorPaths: string[][]): void {
  try {
    if (typeof window.vis === 'undefined') {
      container.innerHTML = '<p style="color:red;">vis-network not loaded</p>';
      return;
    }

    container.innerHTML = '';

    const nodes: any[] = [];
    const edges: any[] = [];

    function traverse(node: TreeNode) {
      nodes.push({
        id: node.id,
        label: `${node.label}\n${formatDuration(node.duration)}`,
        color: {
          background: getNodeColor(node.duration, node.status),
          border: node.status !== 'ok' && node.status !== 'unknown' ? '#b71c1c' : '#666',
          highlight: { background: getNodeColor(node.duration, node.status) }
        },
        shape: 'box',
        font: { color: '#ffffff', size: 14, multi: 'true' },
        widthConstraint: 160
      });

      node.children.forEach(child => {
        edges.push({
          from: node.id,
          to: child.id,
          arrows: 'to',
          color: { color: '#666666' }
        });
        traverse(child);
      });
    }

    traverse(tree);

    // Error propagation path (status only)
    errorPaths.forEach(path => {
      for (let i = 0; i < path.length - 1; i++) {
        edges.push({
          from: path[i],
          to: path[i + 1],
          color: { color: '#d32f2f', highlight: '#d32f2f' },
          dashes: true,
          width: 4,
          arrows: 'to'
        });
      }
    });

    const data = {
      nodes: new window.vis.DataSet(nodes),
      edges: new window.vis.DataSet(edges)
    };

    const options = {
      layout: {
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
          nodeSpacing: 200,
          levelSeparation: 180
        }
      },
      physics: false,
      interaction: {
        zoomView: true,
        dragView: true,
        navigationButtons: true
      }
    };

    new window.vis.Network(container, data, options);
  } catch (err) {
    console.error('Trace tree rendering error:', err);
    container.innerHTML = `<p style="color:red;">Render failed: ${(err as Error).message}</p>`;
  }
}
