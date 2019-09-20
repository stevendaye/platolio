import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Notifications = ({ notifications }) =>
  notifications !== null && notifications.length > 0 &&
  <div>
    {notifications.map(note =>
      <div key = {note.id} className = {`alert alert-${note.alert}`}>
        {note.message}
      </div>
    )}
  </div>

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
}

// Create a seletor to select only the notification state
const getNotifications = state =>
  getArrayOfObject(state.notificationsState);

// Create mapStateToPropsNotifications to return a substate of the Notification state
const mapStateToPropsNotifications = state => {
  return {
    notifications: getNotifications(state)
  };
}

// Convert the Notification state object in an array
function getArrayOfObject(object) {
  return Object.keys(object).map(key => object[key]);
}

const ConnectedNotifications = connect(mapStateToPropsNotifications)(Notifications);

export default ConnectedNotifications;
