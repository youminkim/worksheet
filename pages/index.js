import Head from 'next/head'
import {Page, Card, Select, FormLayout, TextField,  Form, Button} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';

export default function Home() {
  const [operation, setOperation] = useState('+')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)
  const [quantity, setQuantity] = useState(20)
  
  const handleOperationChange = useCallback((s)=>setOperation(s))
  const handleStartChange = useCallback((s)=>setStart(s))
  const handleEndChange = useCallback((s)=>setEnd(s))
  const handleQuantityChange = useCallback((s)=>setQuantity(s))
  
  const handleSubmit = useCallback(()=>{
    console.log("aa")
  })
  return (
    <Page 
      title="Math for children"
      primaryAction={{
        content: 'Create',
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
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <TextField
          label="Start"
          type="number"
          value={start}
          onChange={handleStartChange}
        />
        <TextField
          label="End"
          type="number"
          value={end}
          onChange={handleEndChange}
        />
        </FormLayout.Group>
        </FormLayout>
      </Form>
      </Card>
      <Card>
        ss
      </Card>
    </Page>
  )
}
