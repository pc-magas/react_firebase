import { connect } from 'react-redux';
import logo from './logo.svg';

function Logo({shown}){
    return (
      <img src={logo} className="App-logo" style={{display:!shown?"none":""}} alt="logo" />
    );
  }
  
const mapStateToProps = state => {
    console.log(state);
    return {
      shown: state.flag
    };
};


export default connect(
    mapStateToProps,
)(Logo);