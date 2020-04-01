import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from "prop-types";
import Paginacao from './Paginacao';

const TabelaSetor = ({
  setores,
  hidden,
  currentPage,
  pageSize,
  pagesCount,
  handlePageClick,
  handlePreviousClick,
  handleNextClick
}) => {
  const [selected, setSelected] = useState({nome : '', sigla : ''})

  const [showModalEdit, setShowModalEdit] = useState()
  const toggleEdit = () => setShowModalEdit(!showModalEdit)

  const [showModalDel, setShowModalDel] = useState()
  const toggleDel = () => setShowModalDel(!showModalDel)

  const changeNome = (e) => setSelected({...selected, nome : e.target.value})
    
  const changeSigla = (e) => setSelected({...selected, sigla : e.target.value})

  const updateSetor = () => {
      
  }

  const deleteSetor = () => {
      
  }

    return (
      <div>
        <Table striped bordered dark hover hidden={hidden}>
            <thead>
                <tr>
                  <th>Nome</th>
                  <th>Sigla</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {setores
              .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
              .map(setor => {
                return (
                  <React.Fragment key={setor.id}>
                  <tr>
                    <td>{setor.nome}</td>
                    <td>{setor.sigla}</td>
                    <td>
                      <Button onClick={() => {setSelected(setor); toggleEdit()}}>Editar</Button>
                      <Button className='ml-3' onClick={() => {setSelected(setor); toggleDel()}}>Excluir</Button>
                    </td>
                  </tr>
                  </React.Fragment>
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
            <ModalHeader toggle={toggleEdit}>Editar setor</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Nome do setor</Label>
                        <Input value={selected.nome} id="nome" onChange={changeNome}/>
                        <Label for="sigla">Sigla</Label>
                        <Input value={selected.sigla} id="sigla" className='w-50' onChange={changeSigla}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {updateSetor(); toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={showModalDel} toggle={toggleDel}>
            <ModalHeader toggle={toggleDel}>Excluir setor</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir o setor <span className='font-weight-bold'>{selected.nome} ({selected.sigla})</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {deleteSetor(); toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
  )
}

TabelaSetor.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default TabelaSetor;
