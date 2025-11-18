import React from 'react';
import { Placeholder, Card } from 'react-bootstrap';


export default function SkeletonCard() {
    return (
        <Card className="h-100">
            <div style={{ height: 180 }} className="bg-light d-flex align-items-center justify-content-center">
                <Placeholder as="div" animation="glow">
                    <Placeholder xs={12} style={{ height: 140, display: 'block' }} />
                </Placeholder>
            </div>
            <Card.Body>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={10} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <div className="d-flex justify-content-between mt-3">
                    <Placeholder.Button variant="secondary" xs={6} />
                    <Placeholder.Button variant="secondary" xs={4} />
                </div>
            </Card.Body>
        </Card>
    );
}