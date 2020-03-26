import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from "prop-types";
import Paginacao from './Paginacao';

const TabelaAssunto = ({
  assuntos,
  hidden,
  currentPage,
  pageSize,
  pagesCount,
  handlePageClick,
  handlePreviousClick,
  handleNextClick
}) => {
  const [selected, setSelected] = useState({descricao : ''})

  const [showModalEdit, setShowModalEdit] = useState()
  const toggleEdit = () => setShowModalEdit(!showModalEdit)

  const [showModalDel, setShowModalDel] = useState()
  const toggleDel = () => setShowModalDel(!showModalDel)

  const changeDesc = (e) => setSelected({descricao : e.target.value})

  const updateAssunto = () => {
      
  }

  const deleteAssunto = () => {
      
  }

    return (
      <div>
        <Table striped bordered dark hover hidden={hidden}>
            <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {assuntos
              .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
              .map(assunto => {
                return (
                  <tr>
                    <td>{assunto.descricao}</td>
                    <td>
                      <Button onClick={() => {setSelected(assunto); toggleEdit()}}>Editar</Button>
                      <Button className='mt-3' onClick={() => {setSelected(assunto); toggleDel()}}>Excluir</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={hidden}
          pagesCount={pagesCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          handlePreviousClick={handlePreviousClick}
          handleNextClick={handleNextClick}
        />
        <Modal isOpen={showModalEdit} toggle={toggleEdit}>
            <ModalHeader toggle={toggleEdit}>Editar assunto</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Descrição</Label>
                        <Input value={selected.descricao} id="nome" onChange={changeDesc}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {updateAssunto(); toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={showModalDel} toggle={toggleDel}>
            <ModalHeader toggle={toggleDel}>Excluir assunto</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir o assunto <span className='font-weight-bold'>{selected.descricao}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {deleteAssunto(); toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
  )
}

TabelaAssunto.propTypes = {
  registrations: PropTypes.array.isRequired,
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default TabelaAssunto;
