import { useState, useSyncExternalStore, useTransition, useId } from "react";
import { Button, Input } from "antd";
import { combineReducers, legacy_createStore as createStore } from "redux";

const reducer = (state: number = 1, action: any) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "DEL":
      return state - 1;
    default:
      return state;
  }
};

/* 注册reducer,并创建store */
const rootReducer = combineReducers({ count: reducer });
const store = createStore(rootReducer, { count: 1 });

const Com_useSyncExternalStore = () => {
  //订阅
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.getState().count
  );
  return (
    <>
      <div>数据源： {state}</div>
      <Button type="primary" onClick={() => store.dispatch({ type: "ADD" })}>
        加1
      </Button>
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => store.dispatch({ type: "DEL" })}
      >
        减1
      </Button>
    </>
  )
}


const Com_useTransition = () => {
  const [value, setValue] = useState('')
  const [list, setList] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          startTransition(() => {
            const res: string[] = [];
            for (let i = 0; i < 10000; i++) {
              res.push(e.target.value);
            }
            setList(res);
          });
        }}
      />
      {
        isPending ? <div>加载中。。。。</div> : list.map((id, key) => <div key={key} >{id}</div>)
      }
    </>
  )
}


const Com_useId = () => {
  const id = useId();

  return <div id={id}>查看标签Id属性 - useId</div>;
};

const Index: React.FC<any> = () => {

  return (
    <>
      <div>useSyncExternalStore</div>
      <Com_useSyncExternalStore />

      <div style={{ marginBottom: '50px' }} />

      <div>useTransition</div>
      <Com_useTransition />

      <div style={{ marginBottom: '50px' }} />

      <div>useId</div>
      <Com_useId />
    </>
  );
};

export default Index;
