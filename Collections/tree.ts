interface Iter<T> {
    getNext(): T | null;
    hasMore(): boolean;
}

class TreeNode<T> {
    value: T;
    children: TreeNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }
}

class Tree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    *getDepthFirstIterator() {
        const iterator = new DepthFirstIterator<T>(this.root);
        while (iterator.hasMore()) yield iterator.getNext();
    }

    *getBreadthFirstIterator() {
        const iterator = new BreadthFirstIterator<T>(this.root);
        while (iterator.hasMore()) yield iterator.getNext();
    }
}

class DepthFirstIterator<T> implements Iter<T> {
    private stack: TreeNode<T>[];

    constructor(root: TreeNode<T> | null) {
        this.stack = [];
        if (root) {
            this.stack.push(root);
        }
    }

    getNext(): T | null {
        if (this.stack.length === 0) {
            return null;
        }
        const node = this.stack.pop()!;
        this.stack.push(...node.children.reverse());
        return node.value;
    }

    hasMore(): boolean {
        return this.stack.length > 0;
    }
}

class BreadthFirstIterator<T> implements Iter<T> {
    private queue: TreeNode<T>[];

    constructor(root: TreeNode<T> | null) {
        this.queue = [];
        if (root) {
            this.queue.push(root);
        }
    }

    getNext(): T | null {
        if (this.queue.length === 0) {
            return null;
        }
        const node = this.queue.shift()!;
        this.queue.push(...node.children);
        return node.value;
    }

    hasMore(): boolean {
        return this.queue.length > 0;
    }
}

export { Tree, TreeNode };