@router.get("/", response_model=List[DocumentResponse])
async def list_documents():
    """Returns a history of processed documents with full Pro metadata."""
    mock_docs = []
    for i in range(5):
        doc_id = str(uuid.uuid4())
        mock_docs.append(DocumentResponse(
            id=doc_id,
            filename=f"fatura_00{i+1}.pdf",
            content_type="application/pdf",
            status="completed",
            blockchain_tx_hash="0x" + "".join([uuid.uuid4().hex for _ in range(2)])[:64],
            extracted_data=ExtractedData(
                merchant_name=random.choice(["Shell", "Migros", "Apple", "Turkcell"]),
                date=date.today(),
                total_amount=round(random.uniform(100, 5000), 2),
                tax_amount=round(random.uniform(10, 500), 2),
                currency="TRY",
                invoice_type="E-Arşiv",
                tax_details=[{"rate": 20, "amount": 120.0}],
                blockchain_verified=True,
                items=["Ürün A", "KDV %20"]
            )
        ))
    return mock_docs

@router.post("/scan", response_model=DocumentResponse)
async def scan_document(file: UploadFile = File(...)):
    # ... (existing scan logic remains)
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
        blockchain_tx_hash="0x" + "".join([uuid.uuid4().hex for _ in range(2)])[:64],
        extracted_data=extracted_data
    )
