import { connect } from 'react-redux';

function Token({token}){
    return (
        <div>
            <h1>FCM Token</h1>    
            <div style={{backgroundColor:"white", color:"black" }}>{token}</div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
      token: state.token,
    };
};


export default connect(
    mapStateToProps,
)(Token);