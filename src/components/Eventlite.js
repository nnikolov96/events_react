import React from 'react'
import axios from 'axios'
import './Eventlite.css'
import EventList from './EventList'
import EventForm from './EventForm'
import FormErrors from './FormErrors'
import validations from '../validations'

class Eventlite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: { value: "", valid: false },
      start_datetime: { value: "", valid: false },
      location: { value: "", valid: false },
      formValid: false,
      formErrors: {},
    };
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/events'
    })
      .then(response => {
        this.setState({ events: response.data })
      })
  }

  static formValidations = {
    title: [
      (value) => {
        return validations.checkMinLength(value, 3);
      },
    ],
    start_datetime: [
      (value) => {
        return validations.checkMinLength(value, 1);
      },
      (value) => {
        return validations.timeShouldBeInTheFuture(value);
      },
    ],
    location: [
      (value) => {
        return validations.checkMinLength(value, 1);
      },
    ],
  };

  handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const newState = {};
    newState[name] = { ...this.state[name], value: value };
    this.setState(newState, () => this.validateField(name, value, Eventlite.formValidations[name]));
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.title.valid &&
        this.state.location.valid &&
        this.state.start_datetime.valid,
    });
  }

  validateField(fieldName, fieldValue, fieldValidations) {
    let fieldValid = true;
    let errors = fieldValidations.reduce((errors, validation) => {
      let [valid, fieldError] = validation(fieldValue);
      if (!valid) {
        errors = errors.concat([fieldError]);
      }
      return errors;
    }, []);
    fieldValid = errors.length === 0;
    const newState = {
      formErrors: { ...this.state.formErrors, [fieldName]: errors },
    };
    newState[fieldName] = { ...this.state[fieldName], valid: fieldValid };
    this.setState(newState, this.validateForm);
  }

  handleSubmit = (e) => {
    let newEvent = {
      title: this.state.title.value,
      start_datetime: this.state.start_datetime.value,
      location: this.state.location.value,
    };
    e.preventDefault();
    axios({
      method: "POST",
      url: 'http://localhost:3001/events',
      data: {
        event: newEvent,
      }
    })
      .then((response) => {
        this.addNewEvent(response.data);
        this.resetFormErrors();
      })
      .catch((error) => {
        this.setState({ formErrors: error.response.data });
      });
  };

  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function (a, b) {
      return new Date(a.start_datetime) - new Date(b.start_datetime);
    });
    this.setState({ events: events });
  };

  resetFormErrors() {
    this.setState({ formErrors: {} });
  }

  render() {
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors} />
        <EventForm
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          title={this.state.title.value}
          start_datetime={this.state.start_datetime.value}
          location={this.state.location.value}
          formValid={this.state.formValid}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default Eventlite;