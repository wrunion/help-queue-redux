import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formShowing: false,
      masterTicketList: [],
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
    this.setState({
      masterTicketList: [...this.state.masterTicketList, newTicket],
      formShowing: false
    });
  }

  changeSelectedTicket = (id) => {
    const ticket = this.state.masterTicketList.find(ticket => ticket.id === id);
    this.setState({selectedTicket: ticket});
  }

  handleDeleteClick = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  editTicket = (ticket) => {
    const { masterTicketList, selectedTicket} = this.state;

    this.setState({
      masterTicketList: masterTicketList.filter(ticket => ticket.id !== selectedTicket.id),
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.editTicket} />
      buttonText = "Return to Ticket List";

    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeleteClick} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";

    } else if (this.state.formShowing) {
      currentlyVisibleState = <NewTicketForm createTicket={this.createTicket}  />;
      buttonText = "Return to Ticket List";
      
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.changeSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default TicketControl;