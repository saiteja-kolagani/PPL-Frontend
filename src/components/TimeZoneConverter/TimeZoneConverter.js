import React, { Component } from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import AddTimeZone from '../AddTimeZone/AddTimeZone';
import TimeZoneDisplay from '../TimeZoneDisplay/TimeZoneDisplay';

import './index.css'

class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ['UTC', 'Asia/Kolkata'],
      currentTime: moment(),
      darkMode: false,
    };
  }

  handleTimeZoneAddition = (timeZone) => {
    this.setState((prevState) => ({
      timeZones: [...prevState.timeZones, timeZone],
    }));
  };

  handleTimeZoneDeletion = (index) => {
    this.setState((prevState) => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index),
    }));
  };

  handleDateChange = (date) => {
    this.setState({ currentTime: moment(date) });
  };

  onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ timeZones: items });
  };

  reverseTimeZones = () => {
    this.setState((prevState) => ({
      timeZones: prevState.timeZones.slice().reverse(),
    }));
  };

  toggleDarkMode = () => {
    this.setState(
      (prevState) => ({
        darkMode: !prevState.darkMode,
      }),
      () => {
        document.body.classList.toggle('dark-mode', this.state.darkMode);
      }
    );
  };

  generateShareableLink = () => {
    const params = new URLSearchParams();
    params.append('timeZones', this.state.timeZones.join(','));
    params.append('currentTime', this.state.currentTime.toISOString());
    const shareableURL = `${window.location.origin}?${params.toString()}`;
    return shareableURL;
  };

  scheduleMeet = () => {
    const eventTime = this.state.currentTime
      .toISOString()
      .replace(/-|:|\.\d+/g, '');
    const timeZone = this.state.timeZones[0];
    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Meeting&dates=${eventTime}/${eventTime}&ctz=${timeZone}`;
    window.open(googleCalendarLink, '_blank');
  };

  render() {
    const { timeZones, currentTime, darkMode } = this.state;
    return (
      <div>
        <AddTimeZone onAdd={this.handleTimeZoneAddition} />
        <div className='features-field'>
            <DatePicker
            selected={currentTime.toDate()}
            onChange={this.handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className='date-picker-field'
            />
            <button onClick={this.reverseTimeZones}>Reverse Time Zones</button>
            <button onClick={this.toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button onClick={() => alert(this.generateShareableLink())}>
            Generate Shareable Link
            </button>
            <button onClick={this.scheduleMeet}>Schedule Meet</button>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {this.state.timeZones.map((zone, index) => (
                    <Draggable key={zone} draggableId={zone} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <TimeZoneDisplay
                            timeZone={zone}
                            currentTime={this.state.currentTime}
                            onDelete={() => this.handleTimeZoneDeletion(index)}
                            />
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default TimeZoneConverter;
