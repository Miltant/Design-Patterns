import { Tree, TreeNode } from './tree';

const tree = new Tree<string>();
tree.root = new TreeNode('root');

const child1 = new TreeNode('child1');
tree.root.children.push(child1);
child1.children.push(new TreeNode('child3'));
child1.children.push(new TreeNode('child4'));

const child2 = new TreeNode('child2');
tree.root.children.push(child2);
child2.children.push(new TreeNode('child5'));
child2.children.push(new TreeNode('child6'));


console.log('Depth first traversal');   
for (const node of tree.getDepthFirstIterator()) {
    console.log(node);
}

console.log('Breadth first traversal');
for (const node of tree.getBreadthFirstIterator()) {
    console.log(node);
}