import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import Textarea from '@components/Textarea';

interface Props {
  register: UseFormRegister<any>;
}

const PostSubmitFormBox = ({ register }: Props) => {
  return (
    <div>
      <Textarea />
    </div>
  );
};

export default PostSubmitFormBox;
