import React, { PropsWithChildren } from 'react';

import Button from '@components/Button';

interface Props extends PropsWithChildren {}

const PostBoxLayout = ({ children }: Props) => {
  const handleWritePost = () => {
    console.log(123);
  };

  return (
    <section>
      <nav>
        <Button onClick={handleWritePost}>글쓰기</Button>
      </nav>
      {children}
    </section>
  );
};

export default PostBoxLayout;
