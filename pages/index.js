import Head from 'next/head'
import {Page, Card, Select, Button, FormLayout, Checkbox, Stack, TextField,  Form, DisplayText, TextContainer} from '@shopify/polaris';
import React, {useCallback, useState, useEffect} from 'react';
import ReactGA from 'react-ga';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Problem(props) {

  const s = Number(props.start)
  const e = Number(props.end)+1
  const neg = Boolean(props.negative)
  const car = Boolean(props.carry)

  let a = getRandomInt(s, e) // avoid too many zeros in sets
  let b = getRandomInt(s, e)

  if (props.operation == '+') {
    if (!car) {
      a = getRandomInt(s, e)
      b = getRandomInt(1, 9-a%10) // ignore min value
    }
  } else if (props.operation == '-') {
    if (!car){
      a = getRandomInt(s, e)
      b = getRandomInt(s, a%10)
    } else if (!neg) {
      a = getRandomInt(s, e)
      b = getRandomInt(s, a)
    }
  } else if (props.operation == 'x') {
    if (!car){
      a = getRandomInt(s, e)
      b = getRandomInt(s, a%10 != 0 ? 10/(a%10) : 10 )
    }
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
  const [start, setStart] = useState('1')
  const [end, setEnd] = useState('10')
  const [quantity, setQuantity] = useState('7')
  const [cols, setCols] = useState('6')
  const [carry, setCarry] = useState(true)
  const [negative, setNagative] = useState(true)

  const [startDisabled, setStartDisabled] = useState(false)
  const [negativeDisabled, setNegativeDisabled] = useState(false)

  const handleOperationChange = useCallback((s)=>setOperation(s))
  const handleStartChange = useCallback((s)=>{
    if (Number(s) >= 0)
      setStart(s)
  })
  const handleEndChange = useCallback((s)=>{
    if (Number(s) >= 0)
      setEnd(s)
  })
  const handleQuantityChange = useCallback((s)=>setQuantity(s))
  const handleColsChange = useCallback((s)=>setCols(s))
  const handleCarryChange = useCallback((s)=>{
    setCarry(s)
    setStartDisabled(!s)
    setNegativeDisabled(!s)
    if (!s){
      setStart('1')
      setNagative(false)
    }

    
  })
  const handleNegativeChange = useCallback((s)=>setNagative(s))
  
  const handleSubmit = useCallback(()=>{
    window.print()
  })

  useEffect(()=>{
    ReactGA.initialize('UA-71350538-5');
    ReactGA.pageview(window.location.pathname + window.location.search);
  })

  const problems = Array(Number(quantity)).fill().map((_, i) => {
   const columns = Array(Number(cols)).fill().map((_, i) => {
      return (<Problem {...{operation, start, end, carry, negative}}/>)
   });
   return (
      <div class="row">
      <Stack distribution="fillEvenly" spacing="loose">
         {columns}
      </Stack>
      </div>
    )
  });

  const github = <a href="https://github.com/youminkim/wotksheet">
    <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
  </a>
  return (
    <Page 
      title={<span>Math Worksheet {github}</span>}
      titleMetadata={<u>worksheet.now.sh</u>}
    >
      <div className="no-print">
      <Stack distribution="trailing">
        <Button primary onClick={handleSubmit}>Print</Button>
      </Stack>
      
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
          label="Max"
          type="number"
          value={end}
          onChange={handleEndChange}
        />
        <TextField
          label="Min"
          type="number"
          value={start}
          disabled={startDisabled}
          onChange={handleStartChange}
        />
        <TextField
          label="Rows"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <TextField
          label="Columns"
          type="number"
          value={cols}
          onChange={handleColsChange}
        />
        <Stack vertical>
        <Checkbox
          label="Allow carrying"
          checked={carry}
          onChange={handleCarryChange}
        />
        <Checkbox
          label="Allow negative"
          checked={negative}
          disabled={negativeDisabled}
          onChange={handleNegativeChange}
        />
        </Stack>
        </FormLayout.Group>
        </FormLayout>
      </Form>
      </Card>
      </div>
      <br/>
      <div>
      {problems}
      </div>
      
    </Page>
  )
}
