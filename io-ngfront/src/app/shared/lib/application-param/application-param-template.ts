interface choiceInterface {
  viewValue: string
  value: any
}

export interface ApplicationParamTemplate {
  field: string
  title: string
  editable?: boolean
  subtitle?: string
  icon?: string
  type?: string
  name?: string
  value?: any
  order?: number
  link?: boolean
  linkDisable?: boolean
  tooltip?: string
  choicesPlaceHolder?: string
  choices?: Array<choiceInterface>
}
