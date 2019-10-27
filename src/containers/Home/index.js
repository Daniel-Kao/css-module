import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from './store';
import { Button } from 'antd-mobile';
import styles from './styles.scss';

const Home = props => {
  useEffect(() => {
    props.getList();
  });
  return (
    <div>
      <h1>hello world</h1>
      <Button type="primary" onClick={() => props.getList()}>
        click
      </Button>
      {/* <div className={styles.x}>{renderList(props.list)}</div> */}
    </div>
  );
};

const renderList = list => {
  return list.map(item => {
    return <div key={item.id}>{item.title}</div>;
  });
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getList() {
    dispatch(actions.getNewsList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
