import React, { Component,PropTypes } from 'react';  
import { connect } from 'react-redux';  
import { push } from 'react-router-redux';

export default function requiresAuth(Component) {  
  class AuthenticatedComponent extends Component {
    constructor(props){
      super(props);
    }
    static propTypes = {
      menuData: PropTypes.object,
      dispatch: PropTypes.func.isRequired
    };

    componentWillMount(){
      
    }
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { dispatch } = this.props;

      if (!this.props.menuData) {
        dispatch(push('/'));
      }
    }

    render() {
      const { menuData } = this.props;
      let actualPath = location.pathname;
      let datos = false;
      
      if (menuData.sections) {
        menuData.sections.forEach((value,index) => {
          if (value.url === location.pathname) {
            datos = true;
          }else{
            datos = false;
          }
        });
      }    
      
      return (
        <div className="authenticated">
          { 
            datos && datos === true ? <Component {...this.props} /> : null 
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      menuData: state.usersData.perfilLog
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
//<Component {...this.props} />