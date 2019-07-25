import React, { Component } from 'react'
import axios from 'axios'

class MyComponent extends Component {
  constructor() {
    super()
    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    this.getAllContacts()
  }

  getAllContacts = async () => {
    let res = await axios.get('http://localhost:5000/api')
    this.setState({ contacts: res.data })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        {this.state.contacts.map(contact => (
          <p key={contact._id}>{contact.name}</p>
        ))}
      </div>
    )
  }
}

export default MyComponent
