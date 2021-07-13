import React ,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


// function FetchApi(){
//     const [data, setstate] = useState([])
//     const Getapi=()=>{
//         fetch('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => response.json())
// //   .then((json) => console.log(json));
// .then((json)=>{
//     console.log(json);
//     setstate(json);
// })
//     }
//     useEffect(()=>{
//         Getapi();
//     },[]);
//     return(
//         <div>
//             <h1> New Fetch API </h1>
          
//             <button onClick={Getapi}>Fetch</button><br/>
//             <pre>{JSON.stringify(data,null, 2)}</pre>
       

//         {/* <div>
//                 <ul>
//                     {data.map((item) => {
//                         <li key={item.id}>{item.title}</li>
//                     })}
//                 </ul>
//                 <pre>{JSON.stringify({ item })}</pre>

//         </div> */}
//         </div>
//     )
// }

// ReactDOM.render(<FetchApi />, document.getElementById('root'));

//Fetch API

class Table extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        users: [],
        isLoading: false,
        isError: false
      }
    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        // console.log(response);
        if (response.ok) {
            const users = await response.json()
            // console.log(users);
          this.setState({ users, isLoading: false })
        } else {
          this.setState({ isError: true, isLoading: false })
        }
  }
  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
    
  }
  renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{`${user.address.street}`}</td>
          {/* <td>{user.address.map((data, index) => {
            <p key= { index } >
              { data.street } - { data.city }
            </p>
          })}</td> */}
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td>{ user.company.name}</td>
          
       </tr>
     )
   }) 
  }
    render() {
        const { users, isLoading, isError } = this.state
        
        if (isLoading) {
            return <div>
                <h2>Loading....</h2>
            </div>
        }

        if (isError) {
            return <div>
                <h2>Something went wrong!!</h2>
            </div>
        }
        return users.length > 0
      ? (
        <table>
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No users.
      </div>
      )
  }
    }
  

ReactDOM.render(<Table/>,document.getElementById('newtable'))
