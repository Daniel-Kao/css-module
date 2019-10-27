import React from 'react';
import styles from './style.scss';
import { Button, Modal } from 'antd-mobile';

const alert = Modal.alert;

const Login = () => {
  function findU() {
    alert('Delete', 'foudn you', [
      {
        text: 'cancel',
        onPress: () => {
          console.log(123);
        },
      },
    ]);
  }
  return (
    <div className={styles.container}>
      hi login
      <Button onClick={findU} type="primary" size="middle" className={styles.red}>
        hahah
      </Button>
    </div>
  );
};

export default Login;
