import React from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
// hear mapping alert and output( what ever message along with this message)

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
alerts: PropTypes.array.isRequired
}
// we are mappinppropsg state redux state to props 
const mapStateToProps  =state =>({
alerts: state.alerts
});

export default connect(mapStateToProps) (Alert);

