import StandardButton from "../../../../shared/buttons/StandardButton";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function StudyCardItem({ study, setStudyOpen, setStudy, colors }) {
  return (
    <div
      data-cy="item-study-card"
      className={`center-content ${colors.primary.bg} shadow-md flex-1 flex-col p-6 m-8 rounded-xl`}
    >
      <div
        data-cy="content-study-card"
        className="w-full flex justify-center flex-col mr-auto items-start mb-6"
      >
        <h2 className={`text-2xl font-medium ${colors.primaryRev.text}`}>
          {study.shortName}
        </h2>
        <p className={`text-xl ${colors.primaryRev.text}`}>{study.name}</p>
        <p className={`my-2 ${colors.gray.text}`}>
          {study.description && study.description.substring(0, 200)}
          {study.description && study.description.length >= 200 && " ....."}
        </p>
      </div>
      <StandardButton
        dataCy="button-open-study"
        handleClick={() => [setStudyOpen(true), setStudy(study)]}
        message={
          <div className="center-content w-full flex-row p-0 m-0">
            <p className="">Show More</p>
            <ChevronRightIcon
              className={`h-[1.25em] w-[1.25em] ml-auto ${colors.primary.text}`}
            />
          </div>
        }
        extraClasses={"ml-auto p-[0.5em] px-4 min-w-[10em] rounded-3xl pr-auto"}
        colors={colors}
      />
    </div>
  );
}

export default StudyCardItem;
