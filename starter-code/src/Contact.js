import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import contacts from './contactList.json'

class Contact extends Component {
  state = {
    contacts: contacts,
    someContacts: contacts.slice(0, 5),
    sortNameAscending: true,
    sortPopAscending: true,
    // popularity: contacts.popularity
  };

  showListOfContact = () =>{
    console.log('go')
    return(

      this.state.someContacts.map((ourCeleb, index) => {
        console.log(ourCeleb)
        return <div>
            <table>

              <tr>
                <td>
                  <img src={ourCeleb.pictureUrl} />
                </td>
                <td>
                  <h2>{ourCeleb.name}</h2>
                </td>
                <td>
                  <h4>{ourCeleb.popularity}</h4>
                </td>
              <td><button onClick={() => this.deleteCeleb(index)}>
                Delete Celebrity
              </button></td>
              </tr>
            </table>
            {/* <li key={ourCeleb.index}>
              
            </li> */}
          </div>;
    })
    ) 
  }

  addRandomCelebrity = () => {
    const randomCeleb = [...this.state.contacts]; // copies main array of celebs
    const someOfTheContacts = [...this.state.someContacts]; // copies the slice of arrays
    const randomNum = Math.floor(Math.random() * this.state.contacts.length); // randomizes the index to grab
    const newThing = randomCeleb[randomNum]; // grabs the index of a random Celeb
    const extraNewThing = randomCeleb[randomNum + 1];

    for (let i = 0; i < someOfTheContacts.length; i++) {
      if (newThing === someOfTheContacts[i]) {
        someOfTheContacts.push(extraNewThing);
      }
    }
    someOfTheContacts.push(newThing); // adds the random celeb to the previous array

    this.setState({
      //changes the state to add the new random person
      someContacts: someOfTheContacts
    });
  };

  sortingCelebsbyPopularity = () => {
    // console.log("hello")
    const listOfContacts = [...this.state.someContacts];
    listOfContacts.sort((firstCeleb, secondCeleb) => {
      if (firstCeleb.popularity > secondCeleb.popularity) {
        return this.state.sortPopAscending? -1:1;
      } else if (firstCeleb.popularity < secondCeleb.popularity) {
        return this.state.sortPopAscending ? 1 : -1;
      }
      return 0;
    });

    this.setState({
      //changes the state to add the new random person
      someContacts: listOfContacts,
      sortPopAscending: !this.state.sortPopAscending
    });
  };
  sortingCelebsbyName = () => {
    // console.log("hello")
    const listOfContacts = [...this.state.someContacts];
    listOfContacts.sort((firstCeleb, secondCeleb) => {
      if (firstCeleb.name > secondCeleb.name) {
        return this.state.sortNameAscending ? 1 : -1;
      } else if (firstCeleb.name < secondCeleb.name) {
        return this.state.sortNameAscending ? -1 : 1;
      }
      return 0;
    });

    this.setState({
      //changes the state to add the new random person
      someContacts: listOfContacts,
      sortNameAscending : !this.state.sortNameAscending
    });
  };
  deleteCeleb = (i) => {

    const newContactList = this.state.someContacts;
    newContactList.splice(i, 1); //Remove ith hero from the array
    this.setState({ //Replace the state 
      someContacts: newContactList
    })
  }
// =-=--=-==--=-==--=-=here is where we call the functions and show everything=-==--
  render() {
  

    return <div>
      <table>

      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
      </tr>
        <div className="eachCeleb">
          <button onClick={() => this.addRandomCelebrity()}>
            Add Random Contact
          </button>
          <button onClick={() => this.sortingCelebsbyPopularity()}>
            sort by Popularity
          </button>
          <button onClick={() => this.sortingCelebsbyName()}>
            sort by Name
          </button>
        </div>
        <th>
      <div>{this.showListOfContact()}</div>
        </th>
      </table>
      </div>;
  }
}

export default Contact;



