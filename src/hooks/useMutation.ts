import { useState } from 'react';
import axios from 'axios';

interface UseMutationState<T> {
  isLoading: boolean;
  result?: T;
  error?: object;
}

interface UseMutationProps {
  url: string;
  method?: 'POST' | 'DELETE' | 'PATCH';
}

interface UseMutationResult<T = any> extends UseMutationState<T> {
  mutation: (data: any) => void;
}

interface UseMutationHandler<T = any> {
  (props: UseMutationProps): UseMutationResult<T>;
}

const useMutation = <T>(url: string, method = 'POST'): UseMutationResult<T> => {
  // const useMutation: (props: UseMutationProps) => UseMutationResult<T> = <T = any>(url: string, method = 'POST') => {
  const [state, setSate] = useState<UseMutationState<T>>({
    isLoading: false,
    result: undefined,
    error: undefined,
  });
  const mutation = (data: any) => {
    setSate((prev) => ({ ...prev, isLoading: true }));

    const configs = {
      method,
      url,
      data,
    };

    axios(configs)
      .then((response) => setSate((prev) => ({ ...prev, result: response.data, isLoading: false })))
      .catch((error) => setSate((prev) => ({ ...prev, error, isLoading: false })));
  };
  return { mutation, ...state };
};

export default useMutation;
