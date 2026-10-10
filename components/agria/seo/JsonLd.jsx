// Script JSON-LD reso lato server. `<` è codificato perché il contenuto non
// possa chiudere il tag script.
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
