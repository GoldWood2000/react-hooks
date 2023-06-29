import { useEffect } from 'react';
import useLatest from '../useLatest';

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.()
  }, [])
}

const useUnMount = (fn: () => void) => {
  const fnRef = useLatest(fn)

  useEffect(() => () => {
    fnRef.current()
  }, [])
}

export { useMount, useUnMount }