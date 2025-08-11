import { Calendar } from "iconsax-reactjs";

interface Props {
  timeline: string;
  title: string;
  company?: string;
  link?: string;
}

const ExperienceItem: React.FC<Props> = ({
  timeline,
  title,
  link = "#",
  company,
}) => (
  <div className="flex justify-between my-15 ">
    <div className="flex gap-1 items-center text-primary">
      <Calendar
        size={20}
        className="text-primary"
      />
      <p className="text-sm">{timeline}</p>
    </div>

    <div className="flex text-sm gap-1 items-center">
      <p>{title}</p>
      {company && (
        <p className="bg-lighter-primary text-primary p-2 rounded-lg">
          <a
            href={link}
            target="_blank"
          >
            {company}
          </a>
        </p>
      )}
    </div>
  </div>
);

export default ExperienceItem;
