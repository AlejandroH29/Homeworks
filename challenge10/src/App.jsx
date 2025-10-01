import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, setIncrementStep } from "./counterSlice";
import { push, pop } from "./stackSlice";

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);
  const step = useSelector((state) => state.counter.step);
  const stack = useSelector((state) => state.stack.items);

  const [newStep, setNewStep] = useState("");
  const [stackValue, setStackValue] = useState("");

  const handleSetStep = () => {
    if (!isNaN(Number(newStep)) && newStep !== "") {
      dispatch(setIncrementStep(Number(newStep)));
      setNewStep("");
    }
  };

  const handlePushStack = () => {
    if (stackValue !== "") {
      dispatch(push(Number(stackValue)));
      setStackValue("");
    }
  };

  return (
    <div>
      <h2>Redux Challenge 10</h2>

      <h3>Contador: {counter}</h3>
      <button onClick={() => dispatch(increment())}>Incrementar (+{step})</button>
      <button onClick={() => dispatch(decrement())}>Decrementar (-1)</button>

      <div style={{ marginTop: "16px" }}>
        <p>Nuevo incremento base:</p>
        <input
          type="number"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          placeholder="Ej: 5"
        />
        <button onClick={handleSetStep}>Establecer</button>
      </div>

      <h3>Stack (pila)</h3>
      <input
        type="number"
        value={stackValue}
        onChange={(e) => setStackValue(e.target.value)}
        placeholder="Valor para push"
      />
      <button onClick={handlePushStack}>Push</button>
      <button onClick={() => dispatch(pop())}>Pop</button>

      <ul>
        {stack.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
