import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import Paginacao from './Paginacao';

class Tabela extends Component {

  constructor(props) {
    super(props);
    console.log(props)
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
                  <th>Caixa</th>
                  <th>Estante</th>
                  <th>Prateleira</th>
                </tr>
            </thead>
            <tbody>
            {this.props.processos
              .slice(this.props.currentPage * this.props.pageSize, (this.props.currentPage + 1) * this.props.pageSize)
              .map(processo => {
                return (
                  <React.Fragment key={processo.id}>
                    <tr>
                      <td>{processo.numero}</td>
                      <td>{moment(processo.data).format('DD/MM/YYYY')}</td>
                      <td>{processo.caixa.setor.sigla}</td>
                      <td>{processo.assunto.descricao}</td>
                      <td>{processo.caixa.numero}</td>
                      <td>{processo.caixa.prateleira}</td>
                      <td>{processo.caixa.estante}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao
          pagesCount={this.props.pagesCount}
          currentPage={this.props.currentPage}
          handlePageClick={this.props.handlePageClick}
          handlePreviousClick={this.props.handlePreviousClick}
          handleNextClick={this.props.handleNextClick}
        />
      </React.Fragment>
  )}
}

const mapStateToProps = state => ({
  processos: state.processos,
});

export default connect(mapStateToProps)(Tabela);
