export class Zipper {
  constructor(currentNode, navigationHistory) {
    this.currentNode = currentNode;
    this.navigationHistory = navigationHistory || [];
  }

  static fromTree(tree) {
    return new Zipper(tree, []);
  }

  toTree() {
    // Reconstruct the full tree by going up to the root
    let zipper = this;
    while (zipper.navigationHistory.length > 0) {
      zipper = zipper.up();
    }
    return zipper.currentNode;
  }

  value() {
    return this.currentNode ? this.currentNode.value : null;
  }

  left() {
    if (!this.currentNode || !this.currentNode.left) {
      return null;
    }
    
    const parentContext = {
      direction: 'left',
      parentNode: {
        value: this.currentNode.value,
        left: null,  // We're going to the left child, so left becomes null in parent context
        right: this.currentNode.right
      }
    };
    
    return new Zipper(this.currentNode.left, [...this.navigationHistory, parentContext]);
  }

  right() {
    if (!this.currentNode || !this.currentNode.right) {
      return null;
    }
    
    const parentContext = {
      direction: 'right',
      parentNode: {
        value: this.currentNode.value,
        left: this.currentNode.left,
        right: null  // We're going to the right child, so right becomes null in parent context
      }
    };
    
    return new Zipper(this.currentNode.right, [...this.navigationHistory, parentContext]);
  }

  up() {
    if (this.navigationHistory.length === 0) {
      return null;
    }
    
    const lastStep = this.navigationHistory[this.navigationHistory.length - 1];
    const remainingHistory = this.navigationHistory.slice(0, -1);
    
    let reconstructedParent;
    if (lastStep.direction === 'left') {
      reconstructedParent = {
        value: lastStep.parentNode.value,
        left: this.currentNode,
        right: lastStep.parentNode.right
      };
    } else {
      reconstructedParent = {
        value: lastStep.parentNode.value,
        left: lastStep.parentNode.left,
        right: this.currentNode
      };
    }
    
    return new Zipper(reconstructedParent, remainingHistory);
  }

  setValue(newValue) {
    const updatedNode = {
      value: newValue,
      left: this.currentNode.left,
      right: this.currentNode.right
    };
    
    return new Zipper(updatedNode, this.navigationHistory);
  }

  setLeft(newLeftSubtree) {
    const updatedNode = {
      value: this.currentNode.value,
      left: newLeftSubtree,
      right: this.currentNode.right
    };
    
    return new Zipper(updatedNode, this.navigationHistory);
  }

  setRight(newRightSubtree) {
    const updatedNode = {
      value: this.currentNode.value,
      left: this.currentNode.left,
      right: newRightSubtree
    };
    
    return new Zipper(updatedNode, this.navigationHistory);
  }
}