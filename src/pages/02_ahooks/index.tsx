import { useEffect, useRef, useState } from 'react'
import useLatest from './useLatest';
import { useMount, useUnMount } from './useMount';
import useSafeState from './useSafeState';
import useUpdate from './useUpdate';
import useCreation from './useCreation';
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

const Com_useCreation = () => {
  const creation = useCreation(() => ({
    name: 'leo',
    age: 18
  }), [])
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <div>Creation: {creation.name}-{creation.age}</div>
      <Button type="primary" style={{ display: 'block', margin: '8px' }} onClick={() => update()}>
        update-每次产生新的数组
      </Button>
      <Com_useCreation2 />
    </>
  );
};

const Com_useCreation2 = () => {
  const ref = useRef<any>([1])
  const creation2 = useCreation(() => ({
    name: 'ck',
    age: 20
  }), ref.current)
  const update = useUpdate();

  return (
    <>
      <div>Creation2: {creation2.name}-{creation2.age}</div>
      <Button type="primary" style={{ display: 'block', margin: '8px' }} onClick={() => update()}>
        update-ref保存数组地址-不变
      </Button>
      <Button type="primary" style={{ display: 'block', margin: '8px' }} onClick={() => {
        ref.current.push(1)
        update()
      }}>
        update-ref保存数组地址-push
      </Button>
      <Button type="primary" style={{ display: 'block', margin: '8px' }} onClick={() => {
        ref.current = [2]
        update()
      }}>
        update-ref保存数组地址-改变引用地址
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

      <div>useCreation</div>
      <Com_useCreation />

      <div style={{ marginBottom: '50px' }} />
    </>
  )
}

export default Index