import { useEffect, useState } from 'react';

type useFormStateType = (
  initialValue: string,
) => [value: string, setValue: (value: string) => void, hasChanged: boolean];

export const useFormState: useFormStateType = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  useEffect(() => {
    if (value === initialValue) {
      return setHasChanged(false);
    }
    return setHasChanged(true);
  }, [value, initialValue]);
  return [value, setValue, hasChanged];
};
