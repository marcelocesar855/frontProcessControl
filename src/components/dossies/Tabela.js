import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import Paginacao from './Paginacao';

class Tabela extends Component {

  state = {
    currentPage : 0,
  }

  handlePageClick = (e, index) => {
    e.preventDefault();
    this.setState({currentPage : index});
  };

  handlePreviousClick = (e) => {
      e.preventDefault();
      this.setState({currentPage : this.state.currentPage - 1});
  }

  handleNextClick = (e) => {
      e.preventDefault();
      this.setState({currentPage : this.state.currentPage + 1});
  }

  render(){
    return (
      <React.Fragment>
        <Table striped bordered dark hover>
            <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Caixa</th>
                  <th>Armário</th>
                  <th>Prateleira</th>
                </tr>
            </thead>
            <tbody>
            {this.props.pessoas
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(pessoa => {
                return (
                  <React.Fragment key={pessoa.id}>
                    <tr>
                      <td>{pessoa.nome}</td>
                      <td>{pessoa.matricula}</td>
                      <td>{pessoa.dossieId === null ? pessoa.dossie.numero : 'Desarq.'}</td>
                      <td>{pessoa.dossieId === null ? pessoa.dossie.armario : 'Desarq.'}</td>
                      <td>{pessoa.dossieId === null ? pessoa.dossie.prateleira : 'Desarq.'}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao
          pagesCount={Math.round((this.props.pessoas.length / 10) + 0.49)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
      </React.Fragment>
  )}
}

const mapStateToProps = state => ({
  pessoas: state.pessoas,
});

export default connect(mapStateToProps)(Tabela);
