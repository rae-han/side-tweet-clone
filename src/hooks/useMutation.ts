import { useState } from 'react';
import axios from "axios";

interface UseMutationState<T> {
  loading: boolean;
  result?: T;
  error?: object;
}

interface UseMutationResult<T> extends UseMutationState<T> {
  mutation: (data: any) => void;
}

const useMutation = <T = any>(url: string): UseMutationResult<T> => {
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    result: undefined,
    error: undefined,
  });
  const mutation = (data: any) => {
    setSate((prev) => ({ ...prev, loading: true }));

    const configs = {
      method: 'POST',
      url,
      headers: {
        // 'Content-Type': 'application/json',
      },
      data
    }

    axios(configs)
      .then((response) => setSate((prev) => ({ ...prev, result: response.data, loading: false })))
      .catch((error) => setSate((prev) => ({ ...prev, error, loading: false })));
  };
  return { mutation, ...state };
};

export default useMutation;
