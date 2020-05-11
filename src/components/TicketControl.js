import React from 'react';
import {connect} from 'react-redux';

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
    const ticket = this.state.masterTicketList.find(ticket => ticket.id === id);
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

  //   const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
  //   this.setState({
  //     masterTicketList: newMasterTicketList,
  //     selectedTicket: null
  //   });
  // }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  editTicket = (ticket) => {
    const { masterTicketList, selectedTicket} = this.state;

    const newTicketList = masterTicketList.filter(ticket => ticket.id !== selectedTicket.id);

    this.setState({
      masterTicketList: [...newTicketList, ticket],
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let viewState = null;
    let buttonText = null;

    const { formShowing, masterTicketList, selectedTicket, editing } = this.state;

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

const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}

export default connect(mapStateToProps)(TicketControl);