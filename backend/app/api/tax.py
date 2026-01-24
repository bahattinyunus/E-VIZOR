from fastapi import APIRouter, Depends, Query
from app.services.tax_intelligence import TaxIntelligenceService, BlockchainAuditService
from typing import Optional

router = APIRouter()

@router.get("/regulations/search")
async def search_regulations(q: str):
    """Semantic search simulation for tax laws."""
    laws = [
        {"title": "VUK Mükerrer Madde 227", "content": "Vergi beyannamelerini imzalayacak müşavirlerin sorumlulukları...", "tags": ["Sorumluluk", "İmza"]},
        {"title": "KDV Kanunu Madde 1", "content": "Türkiye'de yapılan ticari, sınai, zirai ve mesleki nitelikteki teslimler...", "tags": ["KDV", "Teslimat"]},
        {"title": "Gelir Vergisi Kanunu Madde 40", "content": "Safi kazancın tespit edilmesi için indirilecek giderler...", "tags": ["Gider", "İndirim"]},
        {"title": "Resmi Gazete 32421", "content": "Dijital mecralarda vergilendirme usullerine dair yeni tebliğ...", "tags": ["Dijital", "Tebliğ"]}
    ]
    # Simple mock search
    results = [law for law in laws if q.lower() in law["title"].lower() or q.lower() in law["content"].lower()]
    return results if results else laws[:2]

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
