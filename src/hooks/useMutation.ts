import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

interface UseMutationResult<T> extends UseMutationState<T> {
  mutation: (data: any) => void;
}

const useMutation = <T = any>(url: string): UseMutationResult<T> => {
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const mutation = (data: any) => {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setSate((prev) => ({ ...prev, data, loading: false })))
      .catch((error) => setSate((prev) => ({ ...prev, error, loading: false })));
    // .then((data) => setSate((prev) => ({ ...prev, data })))
    // .catch((error) => setSate((prev) => ({ ...prev, error })))
    // .finally(() => setSate((prev) => ({ ...prev, loading: false })));
  };
  return { mutation, ...state };
};

export default useMutation;
