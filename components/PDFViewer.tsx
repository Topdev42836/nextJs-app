"use client";
import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

//default function

export default function PDFViewer() {
  const [file, setFile] = useState<string | File>("uploads/sample.pdf");
  const [numPages, setNumPages] = useState<number>(0);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  }

  //onDocumentLoadSuccess function
  
  function onDocumentLoadSuccess({
    numPages: nextNumPages
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  return (
    <div>
      <div>
        <label htmlFor="file">Load from file:</label>{" "}
        <input onChange={onFileChange} accept=".pdf" type="file" />
      </div>
      <div>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
