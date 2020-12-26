import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Container, Grid } from '../ui';
import pdfFile from './Legal.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const TermsAndPrivacy = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    return (
      <Container maxWidth="sm">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <Grid container>
            <Grid item xs={3}>
                <Button fullWidth onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}>Prev</Button>
            </Grid>
            <Grid item xs={4}>
                <p style={{ textAlign: 'center' }}>Page {pageNumber} of {numPages}</p>
            </Grid>
            <Grid item xs={3}>
                <Button fullWidth onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))}>Next</Button>
            </Grid>
        </Grid>
      </Container>
    );
}