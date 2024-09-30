import {
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';

type CodeElementProps = RenderElementProps; // RenderElementProps로 변경
type DefaultElementProps = RenderElementProps; // RenderElementProps로 변경

// Define a React component to render leaves with bold text.
export const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        textDecoration: props.leaf.underline
          ? 'underline'
          : 'none',
        fontStyle: props.leaf.italic ? 'italic' : 'normal',
      }}
    >
      {props.children}
    </span>
  );
};

export const CodeElement = (props: CodeElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const H1Element = (props: CodeElementProps) => {
  return <h1 {...props.attributes}>{props.children}</h1>;
};

export const H2Element = (props: CodeElementProps) => {
  return <h2 {...props.attributes}>{props.children}</h2>;
};

export const H3Element = (props: CodeElementProps) => {
  return <h3 {...props.attributes}>{props.children}</h3>;
};

export const UlElement = (props: CodeElementProps) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

export const OlElement = (props: CodeElementProps) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

export const LiElement = (props: CodeElementProps) => {
  return (
    <li {...props.attributes}>
      {props.children.length > 0 ? props.children : <br />}
    </li>
  );
};

// export const LinkElement = (props: CodeElementProps) => {
//   return (
//     <a href={props.element.text} {...props.attributes}>
//       {props.children}
//     </a>
//   );
// };

export const DefaultElement = (
  props: DefaultElementProps
) => {
  return <p {...props.attributes}>{props.children}</p>;
};
