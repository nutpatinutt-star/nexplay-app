type InteractionLayersProps = {
  noise?: boolean;
};

export default function InteractionLayers({
  noise = true,
}: InteractionLayersProps) {
  return (
    <>
      <span className="interaction-light" aria-hidden="true" />
      <span className="interaction-bloom" aria-hidden="true" />
      {noise && <span className="interaction-noise" aria-hidden="true" />}
    </>
  );
}
