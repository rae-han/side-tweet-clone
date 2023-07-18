import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { FormSchemaType } from '@/typings/form';

interface Props {
  schema: FormSchemaType;
  register: UseFormRegister<any>;
}

const Input = ({ schema, register }: Props) => {
  return (
    <div>
      <input className="text-slate-950" {...register(schema.key)} defaultValue={schema.defaultValue} />
    </div>
  );
};

export default React.memo(Input);
