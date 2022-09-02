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
    fn(root);
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
    return fn(root);
  };

  const find = (value) => {
    const fn = (root) => {
      if (root === null || root.data === value) return root;
      return value < root.data ? fn(root.left) : fn(root.right);
    };
    return fn(root);
  };

  const levelOrder = (fn) => {
    let queue = [root];
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
    f(root);

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
    f(root);

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
    f(root);

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
    f(root);

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
    return f(root);
  };

  const isBalanced = () => Math.abs(height(root.left) - height(root.right)) < 1;
  const rebalance = () => (this.root = buildTree(preorder()));
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
    node ? f(node) : f(root);
  };

  root = buildTree(arr);

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

function driver() {
  let arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  let main = Tree(arr);
  console.log("Tree created! here take a look:");
  main.prettyPrint();

  console.log(
    main.isBalanced() ? "yea it is balanced" : "nope its not balanced"
  );

  console.log(main.levelOrder());
  console.log(main.preorder());
  console.log(main.inorder());
  console.log(main.postorder());

  console.log("now to unbalance the tree, here:");
  main.destroyBalance();
  main.prettyPrint();
  console.log(
    main.isBalanced() ? "yea it is balanced" : "nope its not balanced"
  );

  console.log("mhm now we can fix the tree");
  main.rebalance();
  main.prettyPrint();
  console.log(
    main.isBalanced() ? "yea it is balanced" : "nope its not balanced"
  );

  console.log(main.levelOrder());
  console.log(main.preorder());
  console.log(main.inorder());
  console.log(main.postorder());

  console.log("done!!");
}
driver();
