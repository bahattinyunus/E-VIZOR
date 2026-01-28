from typing import Optional, List
from pydantic import BaseModel
from datetime import date

class DocumentBase(BaseModel):
    filename: str
    content_type: str

class DocumentCreate(DocumentBase):
    pass

class ExtractedData(BaseModel):
    merchant_name: Optional[str] = None
    date: Optional[date] = None
    total_amount: Optional[float] = None
    tax_amount: Optional[float] = None
    currency: str = "TRY"
    invoice_type: str = "E-Fatura"  # "Matbu", "E-Arşiv", "Perakende"
    tax_details: List[dict] = [] # [{"rate": 20, "amount": 100}, ...]
    blockchain_verified: bool = True
    items: List[str] = []
    auto_corrected: bool = False
    correction_details: Optional[str] = None

class DocumentResponse(DocumentBase):
    id: str
    status: str  # "processing", "completed", "failed"
    blockchain_tx_hash: Optional[str] = None
    extracted_data: Optional[ExtractedData] = None
