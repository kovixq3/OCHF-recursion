const LinkedList = () => {
  const append = (value) => {
    if (!value) return "err: no value";
    tail().nextNode = NodeLinkedList(value);
  };
  const prepend = (value) => {
    if (!value) return "err: no value";
    let newNode = NodeLinkedList(value);
    newNode.nextNode = h.nextNode;
    h.nextNode = newNode;
  };
  const size = () => {
    const f = (node) => (node ? 1 + f(node.nextNode) : 0);
    return f(h.nextNode);
  };
  const head = () => {
    return h.nextNode;
  };
  const tail = () => {
    const f = (node) => (node.nextNode ? f(node.nextNode) : node);
    return f(h);
  };
  const at = (index) => {
    if (index < 0 || typeof index !== "number") return "err: invalid index";
    const f = (node, i) => (i !== index ? f(node.nextNode, i + 1) : node);
    return f(h.nextNode, 0);
  };
  const pop = () => {
    const f = (node) => {
      if (!node.nextNode.nextNode) {
        let a = node.nextNode;
        node.nextNode = null;
        return a;
      }
      return f(node.nextNode);
    };
    return f(h);
  };
  const contains = (value) => {
    const f = (node) => {
      if (!node) return false;
      if (node.value === value) return true;
      return f(node.nextNode);
    };
    return f(h);
  };
  const find = (value) => {
    const f = (node) => {
      if (!node) return NaN;
      return node.value !== value ? 1 + f(node.nextNode) : 0;
    };
    return 1 + f(h.nextNode);
  };
  const toString = () => {
    const f = (node) =>
      node ? `( ${node.value} ) -> ${f(node.nextNode)}` : "";
    return f(h.nextNode).slice(0, -4);
  };
  const insertAt = (value, index) => {
    if (!value) return "err: no value";
    if (!index) return "err: no index";
    let n = NodeLinkedList(value);
    n.nextNode = at(index).nextNode;
    at(index).nextNode = n;
    return n;
  };
  const removeAt = (index) => {
    let r = at(index);
    at(index - 1).nextNode = at(index).nextNode;
    return r;
  };

  const h = {
    nextNode: null,
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

const NodeLinkedList = (value, nextNode) => {
  if (!value) value = null;
  if (!nextNode) nextNode = null;
  return { value, nextNode };
};

const list = LinkedList();
list.append("A");
list.append("B");
list.append("C");
