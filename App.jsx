import React, { PureComponent } from 'react'
import { getUsers, getTodos } from './service'

export default class App extends PureComponent {
  domains = ['all', '.biz', '.tv', '.net', '.org', '.ca', '.info', '.me', '.io']

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      todos: [],
      newlistuser: [],
    }
    this.getFilters = this.getFilters.bind(this)
  }

  async componentDidMount() {
    const users = await getUsers()
    const todos = await getTodos()
    this.setState({ users, todos })
    this.listUsers(users, todos)
  }

  getFilters(e) {
    const { users, todos } = this.state
    var value = e.target.value
    let newTempval = users.filter((val) => {
      return val.email.indexOf(value) !== -1
    })
    if (newTempval.length === 0) {
      newTempval = users
    }
    this.listUsers(newTempval, todos)
  }

  listUsers(users, todos) {
    const tempdata = users.map((user) => {
      let counter = 0
      for (const prop in todos) {
        if (
          todos
            .filter((obj) => {
              if (obj.userId === user.id) return obj.userId
            })
            .hasOwnProperty(prop)
        ) {
          counter++
        }
      }
      return (
        <li key={user.id}>
          {user.name} has completed {counter} todos {user.email}
        </li>
      )
    })
    this.setState({
      newlistuser: tempdata,
    })
  }

  renderDropDown() {
    return (
      <select onChange={this.getFilters}>
        {this.domains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
    )
  }

  render() {
    const { newlistuser } = this.state
    return (
      <>
        {this.renderDropDown()}
        <ul>{newlistuser}</ul>
      </>
    )
  }
}
