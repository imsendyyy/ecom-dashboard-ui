import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import ErrorBanner from './ErrorBanner';


export default function Section({ title, sectionState, onRetry }) {
    const { data, loading, error } = sectionState;


    return (
        <Container className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">{title}</h4>
                <small className="text-muted">{loading ? 'Loading...' : error ? 'Error' : `${data.length} items`}</small>
            </div>


            {error ? (
                <ErrorBanner message={error} onRetry={onRetry} />
            ) : loading ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Col key={i}>
                            <SkeletonCard />
                        </Col>
                    ))}
                </Row>
            ) : data.length === 0 ? (
                <div className="text-center text-muted py-4">No items found.</div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                    {data.map((item, idx) => (
                        <Col key={item.id ?? idx}>
                            <ProductCard item={item} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}