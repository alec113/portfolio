interface Props {
  technology: string;
}

const TechnologyBox: React.FC<Props> = ({ technology }) => {
  return (
    <p className="bg-green-100 text-green-500 p-1 px-1.5 rounded-xl text-sm">
      {technology}
    </p>
  );
};

export default TechnologyBox;
