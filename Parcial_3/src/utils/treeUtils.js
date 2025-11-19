export function genId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function treeHeight(root) {
  // soporte para arreglo de raíces
  if (Array.isArray(root)) {
    let maxH = 0;
    for (const r of root) {
      const h = treeHeight(r);
      if (h > maxH) maxH = h;
    }
    return maxH;
  }
  if (!root) return 0;
  function dfs(node) {
    if (!node) return 0;
    if (!node.children || node.children.length === 0) return 1;
    let maxChild = 0;
    for (const ch of node.children) {
      const h = dfs(ch);
      if (h > maxChild) maxChild = h;
    }
    return 1 + maxChild;
  }
  return dfs(root);
}

export function treeCount(root) {
  // soporte para arreglo de raíces
  if (Array.isArray(root)) {
    return root.reduce((s, r) => s + treeCount(r), 0);
  }
  if (!root) return 0;
  let cnt = 0;
  function dfs(n) {
    if (!n) return;
    cnt++;
    (n.children || []).forEach(dfs);
  }
  dfs(root);
  return cnt;
}

export function findById(root, id) {
  if (!root) return null;
  // soporte para arreglo de raíces
  if (Array.isArray(root)) {
    for (const r of root) {
      const res = findById(r, id);
      if (res) return res;
    }
    return null;
  }
  let found = null;
  function dfs(n) {
    if (found) return;
    if (!n) return;
    if (n.id === id) { found = n; return; }
    for (const c of (n.children || [])) {
      dfs(c);
      if (found) return;
    }
  }
  dfs(root);
  return found;
}
