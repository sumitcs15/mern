import React from 'react'
import  {useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/Profile';
const Dashboard = ({
    getCurrentProfile
  }) => {
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
};

const mapStateToprops= state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect( mapStateToprops, { getCurrentProfile } )( Dashboard);
