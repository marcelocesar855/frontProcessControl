import React from 'react';
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
                    <td>{processo.data}</td>
                    <td>{processo.setor}</td>
                    <td>{processo.assunto}</td>
                    <td>{processo.caixa}</td>
                    <td>{processo.prateleira}</td>
                    <td>{processo.estante}</td>
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
