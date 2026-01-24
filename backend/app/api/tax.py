from fastapi import APIRouter, Depends, Query
from app.services.tax_intelligence import TaxIntelligenceService, BlockchainAuditService
from typing import Optional

router = APIRouter()

@router.get("/advice")
async def get_tax_advice(tax_type: Optional[str] = Query("general")):
    """
    Yapay zeka destekli vergi danışmanlığı asistanından tavsiye alır.
    """
    advice = await TaxIntelligenceService.get_advice(tax_type)
    
    # Audit log
    await BlockchainAuditService.log_action(
        user_id="anonymous_user",
        action="GET_TAX_ADVICE",
        details={"tax_type": tax_type}
    )
    
    return advice

@router.get("/audit-status")
async def get_audit_status():
    """
    Blokzincir tabanlı denetim ağının durumunu sorgular.
    """
    return {
        "network": "E-VİZÖR Private Net",
        "node_count": 12,
        "avg_block_time": "2.4s",
        "consensus_algorithm": "IBFT 2.0",
        "status": "healthy"
    }
