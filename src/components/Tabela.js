import React from 'react';
import { Table } from 'reactstrap';

const Tabela = (props) => {

    return (
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
              <tr>
                <td>111.111.111-1111/11</td>
                <td>11/11/1111</td>
                <td>SUBLA</td>
                <td>TESTE</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>111.111.111-1111/11</td>
                <td>11/11/1111</td>
                <td>SUBLA</td>
                <td>TESTE</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>111.111.111-1111/11</td>
                <td>11/11/1111</td>
                <td>SUBLA</td>
                <td>TESTE</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
          </tbody>
      </Table>
  )
}

export default Tabela;
