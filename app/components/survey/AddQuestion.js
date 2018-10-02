import React from 'react'
import {LevelRight, Field, Icon, Label, Control, Input, Button, Modal, ModalCard, 
     ModalCardBody,ModalCardFooter,
     ModalCardHeader, 
    ModalBackground, ModalCardTitle, Delete
} from 'bloomer';
   
 import {withState, compose, withHandlers} from 'recompose'
 
const AddQuestionModal = ({isActive,  question, modalAddQuestion, toggleModal, updateQuestion, addQuestion, isValidQuestion})=> <Modal isActive={isActive}>
    <ModalBackground />
    <ModalCard>
        <ModalCardHeader>
            <ModalCardTitle>Survey Question</ModalCardTitle>
            <Delete onClick={toggleModal}/>
        </ModalCardHeader>
        <ModalCardBody>
            <Field>
            <Label>Question</Label>
             <Control hasIcons>
               <Input onChange={updateQuestion} className="input"  type="text" placeholder='Your question'/>
               <Icon isSize='large' isAlign='right'>
                <span className="fa fa-question"/>
               </Icon>
             </Control>
           </Field>
        </ModalCardBody>
        <ModalCardFooter>
            <Button isStatic={question.length == 0} onClick={()=> modalAddQuestion(addQuestion, toggleModal) } isColor='success'>Add</Button>
            <Button onClick={toggleModal} isColor='warning'>Cancel</Button>
        </ModalCardFooter>
    </ModalCard>
</Modal>

const enhance = compose(
  withState("showModal", "setShowModal", false),
  withHandlers({
        toggleModal: props=>event=>{
          props.setShowModal(!props.showModal)
       }          
  })

)

const enhanceModal = compose(
  withState("question", "setQuestion", ""),  
  withHandlers(function(){
    return {
        isValidQuestion: props => () => console.log('is valid????', props.question.length, !!props.question.length) && props.question.length,
        updateQuestion: props => evt => props.setQuestion(evt.target.value), 
        modalAddQuestion: props => (addQuestion, toggleModal) => {
           addQuestion(props.question)
           toggleModal()
        }
    }    
  }())
)

const AddQuestionModalEnhanced = enhanceModal(AddQuestionModal)
const AddQuestion = ({showModal, addQuestion, setShowModal, toggleModal}) => <LevelRight>
   <Button onClick={()=> setShowModal(true)} isColor='success' isOutlined>Add a question</Button>            
   <AddQuestionModalEnhanced addQuestion={addQuestion} isActive={showModal} toggleModal={toggleModal}/>
</LevelRight>

export default enhance(AddQuestion)