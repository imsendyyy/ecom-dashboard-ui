import React from 'react';
import { Alert, Button } from 'react-bootstrap';


export default function ErrorBanner({ message, onRetry }) {
    return (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
            <div>{message}</div>
            {onRetry && (
                <Button variant="outline-light" onClick={onRetry} size="sm">
                    Retry
                </Button>
            )}
        </Alert>
    );
}