import Head from 'next/head'
import {Page, Card, ChoiceList,  Button} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';

export default function Home() {
  const [operation, setOperation] = useState('+')
  const handleOperationChange = useCallback((s)=>setOperation(s))

  return (
    <Page title="Math for children">
      <Card sectioned>
        <ChoiceList
          title="Operation"
          choices={[
            {label: '+', value: '+'},
            {label: '-', value: '-'},
            {label: 'x', value: 'x'},
            {label: '÷', value: '÷'},
          ]}
          selected={operation}
          onChange={handleOperationChange}
        />

        <Button onClick={() => alert('Button clicked!')}>Example button</Button>
      </Card>
    </Page>
  )
}
