import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { FormSchemaType } from '@/typings/form';

interface Props {
  schema: FormSchemaType;
  register: UseFormRegister<any>;
}

const Input = ({ schema, register }: Props) => {
  return (
    <div className="mt-2">
      <input
        className="text-slate-950 h-10 w-80 p-2 rounded-lg focus:border-4 focus:border-blue-400"
        {...register(schema.key)}
        defaultValue={schema.defaultValue}
      />
    </div>
  );
};

export default React.memo(Input);
