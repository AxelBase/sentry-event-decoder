interface Span {
  span_id: string;
  parent_span_id: string | null;
  op: string;
  description?: string;
  start_timestamp: number;
  timestamp: number;
  status: string;
  data?: Record<string, any>;
  tags?: Record<string, string>;
}

interface TraceContext {
  trace_id: string;
  span_id: string;
  parent_span_id: string | null;
  op: string;
  description?: string;
  status: string;
  start_timestamp?: number;
  timestamp?: number;
}

export interface TreeNode {
  id: string;
  label: string;
  duration: number;
  status: string;
  children: TreeNode[];
}

export function parseTrace(eventJson: any): { tree: TreeNode; errorPaths: string[][] } {
  try {
    const traceContext: TraceContext = eventJson.contexts?.trace || {};
    const spans: Span[] = eventJson.spans || [];

    const nodeMap = new Map<string, TreeNode>();

    // ROOT NODE — must never be marked as error
    const root: TreeNode = {
      id: traceContext.span_id || 'root',
      label: `${traceContext.op || 'unknown'}${traceContext.description ? ` - ${traceContext.description}` : ''}`,
      duration:
        traceContext.start_timestamp && traceContext.timestamp
          ? (traceContext.timestamp - traceContext.start_timestamp) * 1000
          : 0,
      status: 'unknown', // Root is always neutral
      children: []
    };

    nodeMap.set(root.id, root);

    // SPAN NODES
    spans.forEach((span: Span) => {
      const node: TreeNode = {
        id: span.span_id,
        label: `${span.op}${span.description ? ` - ${span.description}` : ''}`,
        duration: (span.timestamp - span.start_timestamp) * 1000,
        status: span.status || 'ok',
        children: []
      };
      nodeMap.set(node.id, node);
    });

    // PARENT → CHILD LINKS
    spans.forEach((span: Span) => {
      if (span.parent_span_id) {
        const parent = nodeMap.get(span.parent_span_id);
        if (parent) {
          parent.children.push(nodeMap.get(span.span_id)!);
        }
      }
    });

    // ERROR PATHS (only status-based)
    const errorPaths: string[][] = [];
    function findErrorPaths(node: TreeNode, currentPath: string[]) {
      const path = [...currentPath, node.id];

      if (node.status !== 'ok' && node.status !== 'unknown') {
        errorPaths.push(path);
      }

      node.children.forEach(child => findErrorPaths(child, path));
    }
    findErrorPaths(root, []);

    return { tree: root, errorPaths };
  } catch (err) {
    console.error('Trace parsing error:', err);
    return {
      tree: { id: 'error', label: 'Parse Error', duration: 0, status: 'error', children: [] },
      errorPaths: []
    };
  }
}
