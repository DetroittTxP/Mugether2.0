import React, { useState } from 'react'
import axios from 'axios';
import { Form, Modal, Button } from 'react-bootstrap'

export default function Add_shop() {
    const [selectlogo, setselectlogo] = useState[''];




    return (
        <div>
            <Form onSubmit={Submit}>
                <Form.Group controlId="shop_name">
                    <Form.Label>shopname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="🛍️  "
                        onChange={onShopchange}
                    />
                </Form.Group>

                <Form.Group controlId="shop_detail">
                    <Form.Label>shopdetail</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        placeholder="📃 รายละเอียดของร้านค้า "
                        onChange={onShopchange}
                    />
                </Form.Group>

                <Form.Group controlId="shop_detail_opening">
                    <Form.Label>opening</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="🕐 เวลาเปิด - ปิด "
                        onChange={onShopchange}
                    />
                </Form.Group>

                <Form.Group controlId="shop_contact_tel">
                    <Form.Label>telephone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="☎️ หมายเลขโทรศัพท์ "
                        onChange={onShopchange}
                    />
                </Form.Group>

                <Form.Group controlId="shop_contact_address">
                    <Form.Label>address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="📍 ที่อยู่ "
                        onChange={onShopchange}
                    />
                </Form.Group>

                <Form.Group controlId="shop_contact_email">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="✉️ อีเมล์ "
                        onChange={onShopchange}
                    />
                </Form.Group>

                <Form.Group controlId="shop_contact_link_url">
                    <Form.Label>link to your shop</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="📎 ลิ้งค์ไปยังร้านค้า "
                        onChange={onShopchange}
                    />
                </Form.Group>

                <Form.Group controlId="shop_contact_item_photo">
                    <Form.Label>Image of product</Form.Label>
                    <Form.Control
                        type="file"
                        // placeholder="📎 รูปภาพ "
                        onChange={onShopchange}
                    />
                </Form.Group>


                <Modal.Footer>

                    <Button type='submit' variant="primary">Add Shop</Button>
                </Modal.Footer>
            </Form>
        </div>
    )







}
