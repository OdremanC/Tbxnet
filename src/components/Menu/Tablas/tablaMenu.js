// Dependencies
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';
import Paginador from '../../Global/Paginador';
import './css/tabla.css';


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
    tableData: PropTypes.array,
    cabeceras: PropTypes.array,
    handleEditarIndex: PropTypes.func,
    handleEliminar: PropTypes.func,
    singleParam: PropTypes.func
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
          <table className="table" id="clientes">
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
                currentData.map((menu, key) => {
                  return (
                    <tr key={key}>
                      <td>{menu._id}</td>
                      <td>{menu.title}</td>
                      <td>{menu.url}</td>
                      <td>
                        <button className="btn btn-warning boton" id={menu._id} onClick={(event)=>this.props.handleEditar(event.target.id)}>Editar</button> 
                        <button className="btn btn-danger boton" id={menu._id} onClick={(event)=>this.props.handleEliminar(menu._id)}>Eliminar</button>
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