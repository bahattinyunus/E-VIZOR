"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface VaultContextType {
    secureMode: boolean;
    toggleSecureMode: () => void;
    metrics: {
        cpu_usage: number;
        memory_usage: number;
        network_load: number;
        blockchain_node_status: string;
        active_validations: number;
        the_vault_integrity: number;
    };
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children }: { children: React.ReactNode }) {
    const [secureMode, setSecureMode] = useState(false);
    const [metrics, setMetrics] = useState({
        cpu_usage: 0,
        memory_usage: 0,
        network_load: 0,
        blockchain_node_status: "checking...",
        active_validations: 0,
        the_vault_integrity: 100
    });

    const toggleSecureMode = () => setSecureMode(!secureMode);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/system/metrics");
                const data = await res.json();
                setMetrics(data);
            } catch (err) {
                console.error("Metrics fetch error:", err);
            }
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <VaultContext.Provider value={{ secureMode, toggleSecureMode, metrics }}>
            {children}
        </VaultContext.Provider>
    );
}

export function useVault() {
    const context = useContext(VaultContext);
    if (context === undefined) {
        throw new Error("useVault must be used within a VaultProvider");
    }
    return context;
}
