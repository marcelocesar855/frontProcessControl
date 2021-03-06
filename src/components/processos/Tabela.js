import React, { Component } from 'react';
import moment from 'moment'
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
                  <th>Número</th>
                  <th>Data Autuação</th>
                  <th>Setor</th>
                  <th>Assunto</th>
                  <th>Volumes</th>
                  <th>Interessado</th>
                  <th>Caixa</th>
                  <th>Armário</th>
                  <th>Prateleira</th>
                </tr>
            </thead>
            <tbody>
            {this.props.processos
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(processo => {
                return (
                  <React.Fragment key={processo.id}>
                    <tr>
                      <td>{processo.numero}</td>
                      <td>{moment(processo.data).format('DD/MM/YYYY')}</td>
                      <td>{processo.setorId === null ? processo.caixa.setor.sigla : `Sedido para ${processo.setor.sigla}`}</td>
                      <td>{processo.assunto.descricao}</td>
                      <td>{processo.volumes}</td>
                      <td>{processo.interessado}</td>
                      <td>{processo.setorId === null ? processo.caixa.numero : 'Desarq.'}</td>
                      <td>{processo.setorId === null ? processo.caixa.armario : 'Desarq.'}</td>
                      <td>{processo.setorId === null ? processo.caixa.prateleira : 'Desarq.'}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao
          pagesCount={Math.round((this.props.processos.length / 10) + 0.49)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
      </React.Fragment>
  )}
}

const mapStateToProps = state => ({
  processos: state.processos,
});

export default connect(mapStateToProps)(Tabela);
