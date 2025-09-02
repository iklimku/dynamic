interface PDFViewProps {
  fileUrl: string;
}

export default function GoogleDocViewer({ fileUrl }: PDFViewProps) {
  const encodedFileUrl = encodeURIComponent(fileUrl);
  const googleDocsUrl = `https://docs.google.com/gview?url=${encodedFileUrl}&embedded=true`;

  return (
    <iframe
      src={googleDocsUrl}
      style={{ width: "100%", height: "100%", border: "none" }}
      title={`PDF Viewer untuk ${fileUrl}`}
    />
  );
}
