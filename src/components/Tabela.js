import React from 'react';
import moment from 'moment'
import { Table } from 'reactstrap';
import PropTypes from "prop-types";
import Paginacao from './Paginacao';

const Tabela = ({
  processos,
  currentPage,
  pageSize,
  pagesCount,
  handlePageClick,
  handlePreviousClick,
  handleNextClick
}) => {

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
            {processos
              .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
              .map(processo => {
                return (
                  <tr>
                    <td>{processo.numero}</td>
                    <td>{moment(processo.data).format('DD/MM/YYYY')}</td>
                    <td>{processo.caixa.setor.sigla}</td>
                    <td>{processo.assunto.descricao}</td>
                    <td>{processo.caixa.numero}</td>
                    <td>{processo.caixa.prateleira}</td>
                    <td>{processo.caixa.estante}</td>
                  </tr>
                );
              })}
            </tbody>
        </Table>
        <Paginacao
          pagesCount={pagesCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          handlePreviousClick={handlePreviousClick}
          handleNextClick={handleNextClick}
        />
      </React.Fragment>
  )
}

Tabela.propTypes = {
  registrations: PropTypes.array.isRequired,
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default Tabela;
