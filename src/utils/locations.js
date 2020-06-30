export const getLocationPath = (id, locations) => {
  const locationsPath = [];
  const treeRecurse = (parentNodeId, node) => {
    if (node.id === parentNodeId) {
      locationsPath.unshift(node);
      return node;
    }
    if (node.children) {
      let parent;
      node.children.some(i => {
        parent = treeRecurse(parentNodeId, i);
        return parent;
      });
      if (parent) {
        locationsPath.unshift(node);
      }
      return parent;
    }
    return null;
  };

  treeRecurse(id, {
    id: 0,
    children: locations,
  });

  return locationsPath;
};
