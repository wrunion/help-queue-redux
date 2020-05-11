import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formShowing: false,
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formShowing: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formShowing: !prevState.formShowing,
      }));
    }
  }

  createTicket = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id, names, location, issue
    }

    dispatch(action);
    this.setState({
      formShowing: false
    });
  }

  changeSelectedTicket = (id) => {
    const ticket = this.props.masterTicketList[id];
    this.setState({selectedTicket: ticket});
  }

  handleDeleteClick = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  editTicket = (ticket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticket;
    const action = {
      type: 'ADD_TICKET',
      id, names, location, issue
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

    // const selectedTicket = this.props.masterTicketList[id];
    // // const newTicketList = masterTicketList.filter(ticket => ticket.id !== selectedTicket.id);

    // this.setState({
    //   masterTicketList: [...newTicketList, ticket],
    //   editing: false,
    //   selectedTicket: null
    // });
  

  render(){
    let viewState = null;
    let buttonText = null;

    const { formShowing, selectedTicket, editing } = this.state;
    const { masterTicketList } = this.props;

    if (editing) {      
      viewState = <EditTicketForm ticket = {selectedTicket} 
          onEditTicket = {this.editTicket} />
      buttonText = "Return to Ticket List";
    }  
    else if (selectedTicket != null) {
      viewState = <TicketDetail ticket = {selectedTicket} 
        onClickingDelete = {this.handleDeleteClick} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    }
    else if (formShowing) {
      viewState = <NewTicketForm createTicket={this.createTicket}  />;
      buttonText = "Return to Ticket List";
    } else {
      viewState = <TicketList ticketList={masterTicketList} onTicketSelection={this.changeSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {viewState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object
}

const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}

export default connect(mapStateToProps)(TicketControl);