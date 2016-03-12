var React = require('react');
var Loading = require('./Loading');
var CountedList = require('./countedList');

var styles = {
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fontSize: '18px',
    overFlow: scroll,
  },
  content: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    marginTop: '30px',
  },
  list:{
    color: 'red;'
  }
}


var Counted = (props) => {
  if (props.isLoading === true) {
  return <Loading />
  }
  else{
    return (
      <div>
      <div style={styles.container}>
        <h1 style={styles.content}>{props.countedInfo.data.length}</h1 >
      </div>
      <CountedList style={styles.list} countedInfo={props.countedInfo.data}/>
      </div>
    )
  }
}

module.exports = Counted;
