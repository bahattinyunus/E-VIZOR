import random
from datetime import date
from app.schemas.document import ExtractedData

class OCRService:
    @staticmethod
    async def process_image(file_content: bytes) -> ExtractedData:
        """
        Simulates an AI Optical Character Recognition process.
        In a real scenario, this would send the image to a PyTorch model or Google Vision API.
        """
        # Simulate processing delay is handled by the caller or task queue in production
        
        # Mock Logic: Return random "Receipt" data
        merchants = ["Migros", "Starbucks", "Shell", "Teknosa", "BİM"]
        
        auto_corrected = random.random() > 0.7
        correction_details = "Mükellef adı 'MİGROS' olarak düzeltildi (Düşük çözünürlük telafisi)." if auto_corrected else None
        
        return ExtractedData(
            merchant_name=random.choice(merchants),
            date=date.today(),
            total_amount=round(random.uniform(50.0, 5000.0), 2),
            tax_amount=round(random.uniform(5.0, 500.0), 2),
            currency="TRY",
            invoice_type=random.choice(["E-Fatura", "E-Arşiv", "Perakende"]),
            tax_details=[{"rate": 20, "amount": round(random.uniform(5.0, 500.0), 2)}],
            blockchain_verified=True,
            items=["KDV %20", "Hizmet Bedeli", "Ürün X"],
            auto_corrected=auto_corrected,
            correction_details=correction_details
        )
