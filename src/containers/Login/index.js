import React from "react";
import styles from "./style.scss";
import { Button } from "antd-mobile";

const Login = () => {
  return (
    <div className={styles.container}>
      hi login
      <Button type='primary' size='middle' className={styles.red}>
        hahah
      </Button>
    </div>
  );
};

export default Login;
