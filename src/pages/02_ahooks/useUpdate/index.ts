import { useState, useCallback } from 'react';

const useUpdate = () => {

  const [, update] = useState({})
  return useCallback(() => update({}), [])
}

export default useUpdate;