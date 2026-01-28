from fastapi import APIRouter
import random
import psutil # Assuming default for observability mock

router = APIRouter()

@router.get("/metrics")
async def get_system_metrics():
    """Returns mock real-time system and network metrics."""
    return {
        "cpu_usage": round(random.uniform(10, 45), 1),
        "memory_usage": round(random.uniform(40, 65), 1),
        "network_load": round(random.uniform(5, 100), 2),
        "io_load": round(random.uniform(2, 20), 1),
        "entropy": round(random.uniform(0.8, 0.99), 3),
        "blockchain_node_status": "synced",
        "active_validations": random.randint(5, 50),
        "the_vault_integrity": 100.0,
        "self_healing_status": "Active (Proactive)"
    }
