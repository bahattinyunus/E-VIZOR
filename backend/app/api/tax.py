from fastapi import APIRouter, Depends, Query
from app.services.tax_intelligence import TaxIntelligenceService, BlockchainAuditService
from typing import Optional

router = APIRouter()

@router.get("/regulations/search")
async def search_regulations(q: str):
    """Semantic search simulation for tax laws."""
    laws = [
        {"title": "VUK Mükerrer Madde 227", "content": "Vergi beyannamelerini imzalayacak müşavirlerin sorumlulukları ve otonom mühürleme yetkileri...", "tags": ["Sorumluluk", "İmza", "Otonomi"]},
        {"title": "KDV Kanunu Madde 1", "content": "Türkiye'de yapılan ticari, sınai, zirai ve mesleki nitelikteki teslimler ve hizmet ifaları...", "tags": ["KDV", "Teslimat", "Hizmet"]},
        {"title": "Gelir Vergisi Kanunu Madde 40", "content": "Safi kazancın tespit edilmesi için indirilecek giderler, amortismanlar ve finansman giderleri...", "tags": ["Gider", "İndirim", "Finans"]},
        {"title": "Resmi Gazete 32421", "content": "Dijital mecralarda vergilendirme usullerine dair yeni tebliğ ve otonom sistem entegrasyonu...", "tags": ["Dijital", "Tebliğ", "Entegrasyon"]},
        {"title": "TTK Madde 18", "content": "Basiretli iş adamı gibi davranma yükümlülüğü ve dijital denetim izlekleri...", "tags": ["TTK", "Denetim", "Sorumluluk"]},
        {"title": "ÖTV Kanunu Madde 12", "content": "Özel Tüketim Vergisi oranlarının belirlenmesi ve otonom tarama metodolojisi...", "tags": ["ÖTV", "Oran", "Metodoloji"]}
    ]
    # Simple mock search with partial matching
    q_low = q.lower()
    results = [law for law in laws if q_low in law["title"].lower() or q_low in law["content"].lower() or any(q_low in t.lower() for t in law["tags"])]
    return results if results else laws[:3]

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

@router.get("/predictive")
async def get_predictive_analytics():
    """Returns AI-driven predictive tax forecasts and optimizations."""
    return await TaxIntelligenceService.get_predictions()

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

@router.get("/executive/shield-status")
async def get_shield_status():
    """Returns the current status of the Executive AI Shield."""
    from app.services.audit_service import SelfHealingService
    return await SelfHealingService.get_shield_metrics()
