// import typia, { tags } from 'typia';

export type ModalPropsType = {
  closeModal?: () => void;
  setShowModalBackground?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export interface LinkData {
  text: string;
  url: string;
  window?: boolean;
  protocol?: boolean;
}

// export const check = typia.createIs<LinkData>();
