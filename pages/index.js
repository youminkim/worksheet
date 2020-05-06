import Head from 'next/head'
import {Page, Card, Select, FormLayout, Checkbox, Stack, TextField,  Form, DisplayText, TextContainer} from '@shopify/polaris';
import React, {useCallback, useState, useEffect} from 'react';
import ReactGA from 'react-ga';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Problem(props) {

  let a = getRandomInt(1, props.end) // avoid too many zeros in sets
  let b = getRandomInt(0, props.end)

  if (!props.carry && props.operation == '+') {
    a = getRandomInt(1, props.end-1)
    b = getRandomInt(1, 9-a%10)
  } else if (!props.carry && props.operation == '-') {
    a = getRandomInt(1, props.end)
    b = getRandomInt(1, a%10)
  } else if (!props.carry && props.operation == 'x') {
    a = getRandomInt(1, props.end)
    b = getRandomInt(1, a%10 != 0 ? 10/(a%10) : 10 )
  } 

  return (
      <TextContainer>
        <table class="problem">
          <tr>
            <td></td>
            <td><Stack distribution="trailing"><DisplayText size="medium"> {a} </DisplayText></Stack></td>
          </tr>
          <tr>
            <td><DisplayText size="medium">{props.operation}</DisplayText></td>
            <td><Stack distribution="trailing"><DisplayText size="medium"> {b} </DisplayText></Stack></td>
          </tr>
        </table>
        {/* <DisplayText size="large">{a} {props.operation} {b} = </DisplayText> */}
        <br/><br/><br/>
      </TextContainer>
  )
}

export default function Home() {
  const [operation, setOperation] = useState('+')
  const [end, setEnd] = useState('10')
  const [quantity, setQuantity] = useState('6')
  const [carry, setCarry] = useState(true)

  const handleOperationChange = useCallback((s)=>setOperation(s))
  const handleEndChange = useCallback((s)=>setEnd(s))
  const handleQuantityChange = useCallback((s)=>setQuantity(s))
  const handleCarryChange = useCallback((s)=>setCarry(s))
  
  const handleSubmit = useCallback(()=>{
    window.print()
  })

  useEffect(()=>{
    ReactGA.initialize('UA-71350538-5');
    ReactGA.pageview(window.location.pathname + window.location.search);
  })

  const problems = Array(Number(quantity)).fill().map((_, i) => {
    return (
      <div class="row">
      <Stack distribution="fillEvenly" spacing="loose">
        <Problem {...{operation, end, carry}}/>
        <Problem {...{operation, end, carry}}/>
        <Problem {...{operation, end, carry}}/>
        <Problem {...{operation, end, carry}}/>
      </Stack>
      </div>
    )
  });


  return (
    <Page 
      title="Math Worksheet"
      titleMetadata={<u>worksheet.now.sh</u>}
      primaryAction={{
        content: 'Print',
        onAction: handleSubmit
      }}
    >
      <Card key="card1" sectioned>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
        <FormLayout.Group condensed>
        <Select
          label="Operator"
          options={[
            {label: '+', value: '+'},
            {label: '-', value: '-'},
            {label: 'x', value: 'x'},
            {label: '÷', value: '÷'},
          ]}
          onChange={handleOperationChange}
          value={operation}
        />
        <TextField
          label="Maximum"
          type="number"
          value={end}
          onChange={handleEndChange}
        />
        <TextField
          label="Rows"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <Stack vertical>
        <Checkbox
          label="Allow carrying"
          checked={carry}
          onChange={handleCarryChange}
        />
        </Stack>
        </FormLayout.Group>
        </FormLayout>
      </Form>
      </Card>
      <br/>
      <div>
      {problems}
      </div>
      
    </Page>
  )
}
