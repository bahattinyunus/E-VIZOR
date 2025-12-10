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
    items: List[str] = []

class DocumentResponse(DocumentBase):
    id: str
    status: str  # "processing", "completed", "failed"
    extracted_data: Optional[ExtractedData] = None
