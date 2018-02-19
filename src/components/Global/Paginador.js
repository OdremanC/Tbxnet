import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';


class Paginador extends Component{
	constructor(props){
		super(props);

		this.state = {
			number: 1,
			currentPage: 1,
			dataPerPage: 5
		}

		this.handleClick = this.handleClick.bind(this);
	}

	static propTypes = {

		data: PropTypes.array,
		perPage: PropTypes.number,
		getDataPage: PropTypes.func,
		PageNumber: PropTypes.func
	}

	componentDidMount(){
		this.props.getDataPage(this.state.dataPerPage);
	}

	handleClick = (event) => {
		event.preventDefault();
	    this.setState({
	    	number: Number(event.target.id)
	    });
	    this.props.PageNumber(event.target.id);
    }

	render(){
		
		const { data } = this.props;
		const { pageNumber, currentPage, dataPerPage } = this.state;

	    const pageNumbers = [];
	    for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
	      pageNumbers.push(i);
	    }
	    const renderPageNumbers = pageNumbers.map(number => {
	      	return (
		        <li 
		          className="page-item"
		          key={number}
		        >
		         <a  id={number} className="page-link" href="#" onClick={this.handleClick}> {number}</a>
		        </li>
	      	);
	    });

		return(
			<div className="Paginador">
				<nav aria-label="...">
		          <ul className="pagination pagination-sm" id="page-numbers">
		            {renderPageNumbers}
		          </ul>
		        </nav>
			</div>
		);
	}
}
export default Paginador;