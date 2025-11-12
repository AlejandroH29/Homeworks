import React from "react";
import StackPage from "./StackPage";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.appShell}>
      <StackPage />
    </div>
  );
}

export default App;
