// Dependencies
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';
import Paginador from '../../Global/Paginador';
import '../css/users.css';

class Table  extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataPerPage: 0,
      numberPage: 1,
      data:[]
    }
  }

  static propTypes = {
    tableData: PropTypes.array    
  };

  getDataPerPage = (event) =>{
    this.setState({
      dataPerPage:event
    });
  }

  getNumberPage = (event) =>{
    this.setState({
      numberPage:event
    });
  }

    render(){
      
      const { cabeceras, tableData } = this.props;
      const { data, numberPage, dataPerPage} = this.state;

      const indexOfLastTodo = numberPage * dataPerPage;
      const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
      const currentData = tableData.slice(indexOfFirstTodo, indexOfLastTodo);

      return(
        <div className="Table">
        <table className="table">
          <thead className="thead-dark">
          {
            cabeceras.map((cabecera,key)=>{
              return(
                <th key={key} scope="col">{cabecera.nombre}</th>
              );  
            })
          }
        
          </thead>
          <tbody>
            {
              currentData.map((DataUsers, key) => {
                return (
                  <tr key={key}>
                    <td><Link to={`SingleArticle/${DataUsers._id}`} onClick={(event)=>this.props.singleParam(DataUsers._id)} >{DataUsers._id}</Link></td>
                    <td>{DataUsers.firstName}</td>
                    <td>{DataUsers.lastName}</td>
                    <td>{DataUsers.userName}</td>
                    <td>{DataUsers.email}</td>
                    <td>
                      <button className="btn btn-warning boton" id={DataUsers._id} onClick={(event)=>this.props.handleEditar(event.target.id)}>Editar</button>
                      <button className="btn btn-danger boton" id={DataUsers._id} onClick={(event)=>this.props.handleEliminar(DataUsers._id)}>Eliminar</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Paginador
          data={this.props.tableData}
          getDataPage ={(event)=>this.getDataPerPage(event)}
          PageNumber = {(event)=>this.getNumberPage(event)}
        />
        </div>
      );
    }
}
export default Table;