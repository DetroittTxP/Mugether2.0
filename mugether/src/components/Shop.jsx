import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Shop = () => {
  return (
    <div className='card_container'>
         <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Shop1</Card.Title>
        <Card.Text>
          detail 1
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Shop2</Card.Title>
        <Card.Text>
           detail 2
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Shop3</Card.Title>
        <Card.Text>
            detail 3
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Shop4</Card.Title>
        <Card.Text>
            detail 4
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>
      
    </div>
  )
}

export default Shop
