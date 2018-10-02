import React from 'react'
import { lifecycle} from 'recompose'

import SurveyForm from './SurveyForm'

const enhance = lifecycle({
  componentWillMount(){
    const survey = this.props.newSurvey()
    this.props.addSurvey(survey)
    this.setState({survey: survey})
  }
})

export default enhance(SurveyForm)