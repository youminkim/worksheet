import Head from 'next/head'
import {Page, Card, Select, FormLayout, Checkbox, Stack, TextField,  Form, DisplayText, TextContainer} from '@shopify/polaris';
import React, {useCallback, useState, useEffect} from 'react';
import ReactGA from 'react-ga';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Problem(props) {

  let a = getRandomInt(0, props.end)
  let b = getRandomInt(0, props.end)

  if (props.noNegative && props.operation == '-') {
    a = getRandomInt(3, props.end)
    b = getRandomInt(0, a)
  }

  return (
      <TextContainer>
        <DisplayText size="large">{a} {props.operation} {b} = </DisplayText>
        <br/><br/><br/>
      </TextContainer>
  )
}

export default function Home() {
  const [operation, setOperation] = useState('+')
  const [end, setEnd] = useState('10')
  const [quantity, setQuantity] = useState('8')
  const [noNegative, setNoNagative] = useState(true)

  const handleOperationChange = useCallback((s)=>setOperation(s))
  const handleEndChange = useCallback((s)=>setEnd(s))
  const handleQuantityChange = useCallback((s)=>setQuantity(s))
  const handleNoNagativeChange = useCallback((s)=>setNoNagative(s))
  
  const handleSubmit = useCallback(()=>{
    window.print()
  })

  useEffect(()=>{
    ReactGA.initialize('UA-71350538-5');
    ReactGA.pageview(window.location.pathname + window.location.search);
  })

  const problems = Array(Number(quantity)).fill().map((_, i) => {
    return (
      <Stack distribution="fillEvenly" spacing="loose">
        <Problem {...{operation, end, noNegative}}/>
        <Problem {...{operation, end, noNegative}}/>
        <Problem {...{operation, end, noNegative}}/>
      </Stack>
    )
  });


  return (
    <Page 
      title="Math Worksheets"
      subtitle="For Children"
      primaryAction={{
        content: 'Print',
        onAction: handleSubmit
      }}
    >
      <Card sectioned>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
        <FormLayout.Group condensed>
        <Select
          label="Operation"
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
          label="Maximum number"
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
        <Checkbox
          label="No negative number"
          checked={noNegative}
          onChange={handleNoNagativeChange}
        />

        </FormLayout.Group>
        </FormLayout>
      </Form>
      </Card>
      <br/>
      <Card sectioned>
      {problems}
      </Card>
      
    </Page>
  )
}
