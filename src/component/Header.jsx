import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';


export default function Header({ ip, locationLabel, gpsStatus, onRetry }) {
    return (
        <Container className="my-4">
            <Row className="align-items-center bg-light rounded p-3 shadow-sm">
                <Col md={8}>
                    <h2 className="mb-0">E-Commerce Home</h2>
                    <small className="text-muted">Personalized deals & suggestions</small>
                </Col>


                <Col md={4} className="text-md-end mt-3 mt-md-0">
                    <div>
                        <strong>IP:</strong> {ip ?? '—'}
                    </div>
                    <div>
                        <strong>Location:</strong> {locationLabel}
                    </div>
                    <div className="mt-2">
                        <Badge bg={gpsStatus === 'allowed' ? 'success' : gpsStatus === 'denied' ? 'danger' : 'secondary'}>
                            {gpsStatus}
                        </Badge>
                        <Button variant="outline-secondary" size="sm" className="ms-2" onClick={onRetry}>
                            Retry
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}