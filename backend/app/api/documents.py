from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import uuid
from app.schemas.document import DocumentResponse, ExtractedData
from app.services.ocr import OCRService

router = APIRouter()

@router.post("/scan", response_model=DocumentResponse)
async def scan_document(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    content = await file.read()
    
    # Process with mock OCR
    extracted_data = await OCRService.process_image(content)
    
    return DocumentResponse(
        id=str(uuid.uuid4()),
        filename=file.filename,
        content_type=file.content_type,
        status="completed",
        extracted_data=extracted_data
    )
