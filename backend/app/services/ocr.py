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
        
        return ExtractedData(
            merchant_name=random.choice(merchants),
            date=date.today(),
            total_amount=round(random.uniform(50.0, 5000.0), 2),
            tax_amount=round(random.uniform(5.0, 500.0), 2),
            items=["KDV %18", "Hizmet Bedeli", "Ürün X"]
        )
