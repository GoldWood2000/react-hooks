import { useEffect, useState } from 'react'
import useLatest from './useLatest';
import { useMount, useUnMount } from './useMount';
import useSafeState from './useSafeState';
import useUpdate from './useUpdate';
import { Button, message } from 'antd';

const Com_useLatest = () => {
  const [state, setState] = useState(0)
  const _last = useLatest(state)

  useEffect(() => {
    const time = setInterval(() => {
      // console.log(state, _last);
      setState(_last.current + 1)
    }, 1000)
    return () => clearInterval(time)
  })
  return (
    <>
      <div>定时器：{state}</div>
    </>
  )
}


const Com_useMount_useUnMount = () => {
  const [flag, setFlag] = useState(false)

  const Child = () => {
    useMount(() => {
      message.info('初次渲染')
    })

    useUnMount(() => {
      message.info('组件销毁')
    })

    return <>Child</>
  }

  return (
    <>
      <Button type='primary' onClick={() => setFlag(!flag)}>{!flag ? '显示' : '隐藏'}</Button>
      <div>{flag && <Child />}</div>
    </>
  )
}


const Com_useSafeState = () => {
  const [visible, setVisible] = useState(true);

  const Child = () => {
    const [value, setValue] = useSafeState<string>();

    useEffect(() => {
      setTimeout(() => {
        setValue('data loaded from server');
      }, 5000);
    }, []);

    const text = value || 'Loading...';

    return <div>{text}</div>;
  };

  return (
    <div>
      <Button type='primary' onClick={() => setVisible(false)}>Unmount</Button>
      {visible && <Child />}
    </div>
  )
}

const Com_useUpdate = () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button type="primary" onClick={() => update()}>
        update
      </Button>
    </>
  );
};


const Index = () => {
  return (
    <>
      <div>useLatest</div>
      <Com_useLatest />

      <div style={{ marginBottom: '50px' }} />

      <div>useMount_useUnMount</div>
      <Com_useMount_useUnMount />

      <div style={{ marginBottom: '50px' }} />

      <div>useSafeState</div>
      <Com_useSafeState />

      <div style={{ marginBottom: '50px' }} />

      <div>useUpdate</div>
      <Com_useUpdate />

      <div style={{ marginBottom: '50px' }} />
    </>
  )
}

export default Index