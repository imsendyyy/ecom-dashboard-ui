import React from 'react';
import { Card, Button } from 'react-bootstrap';


export default function ProductCard({ item }) {
    const title = item?.title ?? item?.name ?? (item?.body ? item.body.slice(0, 60) : 'Item');
    const price = item?.price ? `₹${item.price}` : null;
    const img = item?.image ?? item?.thumbnail ?? null;


    return (
        <Card className="h-100 shadow-sm">
            {img ? (
                <Card.Img variant="top" src={img} style={{ objectFit: 'contain', height: 180 }} />
            ) : (
                <div style={{ height: 180 }} className="d-flex align-items-center justify-content-center bg-light">No image</div>
            )}


            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">{title}</Card.Title>
                {price && <div className="fw-semibold mb-2">{price}</div>}
                <div className="mt-auto d-flex justify-content-between">
                    <Button size="sm" variant="primary">Add to Cart</Button>
                    <Button size="sm" variant="outline-secondary">Wishlist</Button>
                </div>
            </Card.Body>
        </Card>
    );
}