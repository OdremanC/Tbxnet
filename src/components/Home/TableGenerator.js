// Dependencies
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';
import Paginador from '../../Global/Paginador';
import '../css/Home.css';


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
                currentData.map((cliente, key) => {
                  return (
                    <tr key={key}>
                      <td><Link to={`SingleClient/${cliente._id}`} onClick={(event)=>this.props.singleParam(cliente._id)}>{cliente._id}</Link></td>
                      <td>{cliente.name}</td>
                      <td>{cliente.lastName}</td>
                      <td>{cliente.dni}</td>
                      <td>{cliente.civilState}</td>
                      <td>
                        <button className="btn btn-warning boton" id={cliente._id} onClick={(event)=>this.props.handleEditar(event.target.id)}>Editar</button> 
                        <button className="btn btn-danger boton" id={cliente._id} onClick={(event)=>this.props.handleEliminar(cliente._id)}>Eliminar</button>
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