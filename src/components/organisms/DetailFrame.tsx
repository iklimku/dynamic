// src/components/organisms/DetailIframe.tsx

// Definisikan tipe props yang dibutuhkan oleh komponen ini
// Kita hanya butuh title dan iframeUrl dari keseluruhan data item
interface DetailIframeProps {
  title: string;
  iframeUrl?: string | null;
}

const DetailIframe = ({ title, iframeUrl }: DetailIframeProps) => {
  // Jika karena suatu alasan iframeUrl tidak ada, jangan render apa-apa
  if (!iframeUrl) {
    return null;
  }

  return (
    <div className="w-full">
      <iframe
        src={iframeUrl}
        title={title} // Atribut title penting untuk aksesibilitas
        width="100%"
        height="700px" // Anda bisa sesuaikan tinggi sesuai kebutuhan
        style={{
          border: "1px solid #e2e8f0", // Sedikit border agar terlihat rapi
          borderRadius: "8px", // Samakan dengan style lain jika ada
        }}
        allowFullScreen
      />
    </div>
  );
};

export default DetailIframe;
