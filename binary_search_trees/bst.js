const TreeNode = (data, left, right) => {
  left = null;
  right = null;
  return { data, left, right };
};

const Tree = (arr) => {
  const buildTree = (arr) => {
    const arrfn = [...new Set(arr.sort((a, b) => (a > b ? 1 : -1)))];

    const fn = (arr, start, end) => {
      if (start > end) return null;
      let mid = Math.floor((start + end) / 2);
      let root = TreeNode(arr[mid]);

      root.left = fn(arr, start, mid - 1);
      root.right = fn(arr, mid + 1, end);

      return root;
    };

    return fn(arrfn, 0, arrfn.length - 1);
  };

  const insert = (value) => {
    const fn = (n) => {
      if (!n) {
        n = TreeNode(value);
        return n;
      }

      if (value < n.data) {
        n.left = fn(n.left);
      } else if (value > n.data) {
        n.right = fn(n.right);
      }

      return n;
    };
    fn(this.root);
  };

  const remove = (value) => {
    const fn = (r, p) => {
      if (r === null) return "err: node not found";
      if (r.data === value) {
        if (r.left && r.right) {
          const f = (r) => (r.left ? f(r.left) : r);
          let replacement = f(r.right);
          remove(replacement.data);
          r.data = replacement.data;
        } else if (r.left) {
          p.left === r ? (p.left = r.left) : (p.right = r.left);
        } else if (r.right) {
          p.left === r ? (p.left = r.right) : (p.right = r.right);
        } else {
          p.left === r ? (p.left = null) : (p.right = null);
        }
        return;
      }
      p = r;
      return value < r.data ? fn(r.left, p) : fn(r.right, p);
    };
    return fn(this.root);
  };

  const find = (value) => {
    const fn = (root) => {
      if (root === null || root.data === value) return root;
      return value < root.data ? fn(root.left) : fn(root.right);
    };
    return fn(this.root);
  };

  const levelOrder = (fn) => {
    let queue = [this.root];
    const f = (node, i) => {
      if (!node) return;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      i++;
      f(queue[i], i);
    };
    f(queue[0], 0);

    return fn ? queue.forEach((i) => fn(i)) : queue.map((i) => i.data);
  };

  const levelOrderRewrite = (fn) => {
    let queue = [];
    let result = [];
    const f = (node) => {
      if (!node) return;
      fn ? fn(node) : result.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      f(queue.shift());
    };
    f(this.root);

    if (!fn) return result.map((i) => i.data);
    return;
  };

  const preorder = (fn) => {
    let result = [];
    const f = (node) => {
      if (!node) return;
      fn ? fn(node) : result.push(node);
      f(node.left);
      f(node.right);
    };
    f(this.root);

    if (!fn) return result.map((i) => i.data);
    return;
  };

  const inorder = (fn) => {
    let result = [];
    const f = (node) => {
      if (!node) return;
      f(node.left);
      fn ? fn(node) : result.push(node);
      f(node.right);
    };
    f(this.root);

    if (!fn) return result.map((i) => i.data);
    return;
  };

  const postorder = (fn) => {
    let result = [];
    const f = (node) => {
      if (!node) return;
      f(node.left);
      f(node.right);
      fn ? fn(node) : result.push(node);
    };
    f(this.root);

    if (!fn) return result.map((i) => i.data);
    return;
  };

  const height = (node) => {
    return node ? Math.max(height(node.left), height(node.right)) + 1 : -1;
  };

  const depth = (node) => {
    const f = (n) => {
      if (!n || !node) return "err: node not found";
      if (node === n) return 0;
      return node.data < n.data ? f(n.left) + 1 : f(n.right) + 1;
    };
    return f(this.root);
  };

  const isBalanced = () =>
    Math.abs(height(this.root.left) - height(this.root.right)) < 1;

  const rebalance = () => {
    this.root = buildTree(preorder());
  };

  const destroyBalance = () => {
    let x = Math.floor(Math.random() * 500);
    for (let i = 0; i < 5; i++) {
      insert(x + i);
    }
  };

  const prettyPrint = (node) => {
    const f = (node, prefix = "", isLeft = true) => {
      if (node.right !== null) {
        f(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        f(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
    node ? f(node) : f(this.root);
  };

  this.root = buildTree(arr);
  return {
    prettyPrint,
    insert,
    remove,
    find,
    levelOrder,
    levelOrderRewrite,
    preorder,
    inorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
    destroyBalance,
  };
};

const jason = Tree([
  10, 5, 2, 1, 3, 4, 7, 6, 8, 9, 15, 12, 11, 13, 14, 18, 16, 17, 19, 20, 728,
  727, 726, 725, 720, 721,
]);
