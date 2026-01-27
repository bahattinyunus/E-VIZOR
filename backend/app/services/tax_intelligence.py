import random
from datetime import datetime

class TaxIntelligenceService:
    @staticmethod
    async def get_advice(tax_type: str = "general"):
        advices = {
            "kdv": [
                "KDV indirim haklarından yararlanmak için fatura tarihlerinizi kontrol edin.",
                "E-fatura geçiş sürecinde mükellefiyet durumunuzu güncel tutun.",
                "İhracat istisnası kapsamında iade süreçlerini ay sonunda başlatın."
            ],
            "gelir": [
                "Şahıs şirketleri için gider dökümlerini üçer aylık periyotlarla onaylayın.",
                "Eğitim ve sağlık harcamalarının matrah indirimindeki limitlerini kontrol edin.",
                "Genç girişimci istisnası şartlarını taşıyıp taşımadığınızı analiz ettik."
            ],
            "general": [
                "2025 yılı yeni vergi dilimlerine göre maliyet planlamanızı yapın.",
                "Dijital dönüşüm teşvikleri için KOSGEB başvurularını kaçırmayın.",
                "Yapay zeka asistanımız bugün tüm evraklarınızı %100 başarıyla işledi."
            ]
        }
        
        advice_list = advices.get(tax_type.lower(), advices["general"])
        
        return {
            "timestamp": datetime.now().isoformat(),
            "tax_type": tax_type,
            "advice": random.choice(advice_list),
            "confidence_score": 0.98,
            "source": "E-VİZÖR AI Regulatory Engine"
        }

    @staticmethod
    async def get_predictions():
        """Simulates predictive tax analysis and trend forecasting."""
        months = ["Eki", "Kas", "Ara", "Oca", "Şub", "Mar"]
        current_year_trend = [random.randint(40000, 60000) for _ in range(6)]
        predicted_trend = [val * random.uniform(0.9, 1.15) for val in current_year_trend]
        
        return {
            "months": months,
            "actual_trend": current_year_trend,
            "predicted_trend": [round(v, 2) for v in predicted_trend],
            "optimizations": [
                {
                    "title": "Ar-Ge İndirimi Tahmini",
                    "impact": "₺12,400 Tasarruf",
                    "description": "Mevcut projelerinizin Ar-Ge merkezi statüsüne geçişi ile yıl sonunda beklenen vergi kalkanı artışı.",
                    "priority": "High"
                },
                {
                    "title": "İhracat İstisnası Optimizasyonu",
                    "impact": "₺5,200 Geri Kazanım",
                    "description": "Gelecek çeyrekteki yurt dışı satış tahminlerinize göre KDV iade potansiyeli yüksektir.",
                    "priority": "Medium"
                }
            ],
            "summary": {
                "projected_yearly_tax": 482000.0,
                "potential_savings": 24800.0,
                "confidence": 0.94
            }
        }

class BlockchainAuditService:
    @staticmethod
    async def log_action(user_id: str, action: str, details: dict):
        mock_hash = "0x" + "".join([random.choice("0123456789abcdef") for _ in range(64)])
        
        # In a real app, this would send to a blockchain node
        print(f"[BLOCKCHAIN AUDIT] User {user_id} performed {action}. TX Hash: {mock_hash}")
        
        return {
            "transaction_hash": mock_hash,
            "block_id": random.randint(1000000, 9999999),
            "status": "confirmed",
            "network": "Hyperledger Besu (E-VİZÖR Private Net)"
        }
