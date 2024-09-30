// TypeScript users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type CustomElement = {
  type:
    | 'paragraph'
    | 'code'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'ul'
    | 'ol'
    | 'li'
    | 'image'
    | 'video'
    | '';
  children: (CustomElement | CustomText)[];
};
export type CustomText = {
  text: string;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
