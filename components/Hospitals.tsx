import HospitalCard from "./HospitalCard";
export default function Hospitals() {
  return (
    <section id="support" aria-labelledby="support-h" className="bg-plum/[0.04]">
      <div className="section">
        <h2 id="support-h" className="h2">Supporting Children Close to Home</h2>
        <p className="mt-4 max-w-2xl text-lg">This fundraiser supports Starlight broadly, with a particular focus on helping children and families at these Sydney hospitals.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <HospitalCard accent="blush" name="Sydney Children's Hospital, Randwick" body="Supporting children and families through Starlight's work at Sydney Children's Hospital, Randwick." />
          <HospitalCard accent="sun" name="The Children's Hospital at Westmead" body="Supporting children and families through Starlight's work at The Children's Hospital at Westmead." />
        </div>
      </div>
    </section>
  );
}
