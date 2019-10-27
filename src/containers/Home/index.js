import React from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";
import { Button } from "antd-mobile";

const Home = props => {
  console.log(props);
  return (
    <p className={styles.red}>
      home ha
      <Button type='primary'>hahaha</Button>
    </p>
  );
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Home);
