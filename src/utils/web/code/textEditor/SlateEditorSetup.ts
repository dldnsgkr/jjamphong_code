import { CustomElement } from '@type/web/slateTypes';
import { Node } from 'slate';

// 타입 가드 정의
export const isCustomElement = (
  node: Node
): node is CustomElement => {
  return (node as CustomElement).type !== undefined;
};
