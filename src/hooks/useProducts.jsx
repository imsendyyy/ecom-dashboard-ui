import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

const ENDPOINTS = {
    frequentlyBought: "https://fakestoreapi.com/products?limit=4",
    suggested: "https://fakestoreapi.com/products?limit=4",
    bestDeals: "https://fakestoreapi.com/products?limit=4",
    outOfStock: "https://jsonplaceholder.typicode.com/comments?_limit=4",
};

export default function useProducts() {
    const [sections, setSections] = useState({
        frequentlyBought: { data: [], loading: true, error: null },
        suggested: { data: [], loading: true, error: null },
        bestDeals: { data: [], loading: true, error: null },
        outOfStock: { data: [], loading: true, error: null },
    });

    const controllerRef = useRef(null);

    const fetchAll = useCallback(async () => {
        if (controllerRef.current) controllerRef.current.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        // set loading = true for all
        setSections((s) => {
            const updated = {};
            for (const key in s) {
                updated[key] = { ...s[key], loading: true, error: null };
            }
            return updated;
        });

        try {
            const responses = await Promise.allSettled([
                axios.get(ENDPOINTS.frequentlyBought, { signal: controller.signal }),
                axios.get(ENDPOINTS.suggested, { signal: controller.signal }),
                axios.get(ENDPOINTS.bestDeals, { signal: controller.signal }),
                axios.get(ENDPOINTS.outOfStock, { signal: controller.signal }),
            ]);

            const [fb, sug, deals, out] = responses;

            setSections({
                frequentlyBought: {
                    data: fb.status === "fulfilled" ? fb.value.data : [],
                    loading: false,
                    error: fb.status === "rejected" ? fb.reason?.message : null,
                },
                suggested: {
                    data: sug.status === "fulfilled" ? sug.value.data : [],
                    loading: false,
                    error: sug.status === "rejected" ? sug.reason?.message : null,
                },
                bestDeals: {
                    data: deals.status === "fulfilled" ? deals.value.data : [],
                    loading: false,
                    error: deals.status === "rejected" ? deals.reason?.message : null,
                },
                outOfStock: {
                    data: out.status === "fulfilled" ? out.value.data : [],
                    loading: false,
                    error: out.status === "rejected" ? out.reason?.message : null,
                },
            });

        } catch (err) {
            if (axios.isCancel(err)) return;
            console.error("Unexpected error:", err);
        }
    }, []);


    const retrySection = useCallback(async (key) => {
        const controller = new AbortController();

        setSections((s) => ({
            ...s,
            [key]: { ...s[key], loading: true, error: null },
        }));

        try {
            const res = await axios.get(ENDPOINTS[key], {
                signal: controller.signal,
            });

            setSections((s) => ({
                ...s,
                [key]: { data: res.data, loading: false, error: null },
            }));
        } catch (err) {
            if (axios.isCancel(err) || err.name === "CanceledError") return;

            setSections((s) => ({
                ...s,
                [key]: { ...s[key], loading: false, error: err.message },
            }));
        }

        return () => controller.abort();
    }, []);

    useEffect(() => {
        fetchAll();
        return () => controllerRef.current?.abort();
    }, [fetchAll]);

    return {
        sections,
        fetchAll,
        retrySection,
    };
}
